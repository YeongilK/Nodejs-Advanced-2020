const mysql = require('mysql');
const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

let conn = mysql.createConnection({
    host:   config.host,
    user:   config.user,
    password:   config.password,
    database:   config.database,
    port:   config.port
});

conn.connect();

let sql = `insert into song(title, lyrics) 
    values('Dynamite', 'Cos ah ah I’m in the stars tonight');`;
conn.query(sql, function(error, fields) {
    if (error)
        throw error;
});

conn.end();