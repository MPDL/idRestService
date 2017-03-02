let config = require('./config.json');
let dbConfig = config.db;
dbConfig.max = 1; // changing this would end in concurrency issues

const postgres = require('pg');
const pool = new postgres.Pool(dbConfig);

// getNextId returns the next available ID. 
// If an error occours the DB will do a ROLLBACK
exports.getNextId = function (req, res, next) {
    pool.connect(function (err, client, done) {
        if (err) {
            // pass ERROR to the express error handler
            return next(err);
        }
        // Start transaction
        client.query('BEGIN', function (err) {
            if (err) {
                return rollback(client, done);
            }
            let id = 0;
            console.log('DB connected');
            // retrieve id from DB
            client.query('SELECT currentid FROM id', function (err, result) {
                console.log('trying DB query');
                if (err) {
                    return rollback(client, done);
                }
                // workaround for anonymous object in node 6 
                id = JSON.parse(JSON.stringify(result.rows[0].currentid));
                console.log('currentid = ' + id);
                
                // update DB with incremented id
                client.query('UPDATE id SET currentid = ' + (id + 1) + ' WHERE currentid = ' + id, function (err, result) {
                    console.log('UPDATE id SET currentid = ' + (id + 1) + ' WHERE currentid = ' + id);
                    if (err) {
                        return rollback(client, done);
                    }
                    // commit transaction if everything is fine
                    client.query('COMMIT', done);
                    res.json(id);
                });
            });
        });
    })
};

// rollback function if something went wrong
let rollback = function (client, done) {
    client.query('ROLLBACK', function (err) {
        //if there was a problem rolling back the query
        //something is seriously messed up.  Return the error
        //to the done function to close & remove this client from
        //the pool.  If you leave a client in the pool with an unaborted
        //transaction weird, hard to diagnose problems might happen.
        return done(err);
    });
};