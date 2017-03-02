let express = require('express');
let app = express();
let dbController = require('./dbController.js');
let http = require('http');
let config = require('./config.json');


app.get('/', function (req, res) {
    // Send the HTTP header 
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<html><body><h1>Server running!</h1>' 
    + '<h2>To retrieve the next id goto /id</h2></body></html>')
}).listen(config.port);

app.get('/id', function (req, res, next) {
    console.log('requesting view /id');
    dbController.getNextId(req, res, next);
});

console.log('Server running at http://127.0.0.1:' + config.port);