#Sequential incrementing REST-ID Service

This REST-service returns an incrementing ID stored in a PostgreSQL DB

## Install

Get the current version.

Create a database
```sql
CREATE DATABASE id_generator
  WITH OWNER = myowner
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       CONNECTION LIMIT = -1;
```
Create a table (column must be named "currentid")
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
Add a value into your created table
```sql
INSERT INTO id VALUES (1);
```

Adjust config.json to fit your db configuration

## Start

```sh
$ node idServer.js
```

Go to your webbrowser and call localhost:yourport/id to get the next id and increment the db entry
The db pool is set to 1 so no concurrency should be possible