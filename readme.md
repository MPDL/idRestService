#Sequential incrementing REST-ID Service

This REST-service returns an incrementing ID stored in a PostgreSQL DB

## Install

Get the current version.
Install a database and create a table (column must be named "currentid")

```sql
CREATE DATABASE id_generator
  WITH OWNER = myowner
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'German, Germany'
       LC_CTYPE = 'German, Germany'
       CONNECTION LIMIT = -1;
```
```sql
CREATE TABLE id
(
  currentid integer
)
WITH (
  OIDS=FALSE
);
ALTER TABLE id
  OWNER TO myowner;
```
```sql
INSERT INTO id VALUES (1);
```

Add a value into your created table
Adjust config.json to fit your db configuration

## Start

```sh
$ node idServer.js
```

Go to your webbrowser and call localhost:yourport/id to get the next id and increment the db entry
The db pool is set to 1 so no concurrency should be possible