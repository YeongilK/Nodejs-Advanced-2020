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

let sql = `insert into song(title, lyrics) values(?, ?);`; 
let params = ['눈누난나', '그래서 난 눈누난나'];
conn.query(sql, params, function(error, fields) {
    if (error)
        throw error;
    let sql = 'SELECT * FROM song ORDER BY sid DESC LIMIT 3;';
    conn.query(sql, function(err, rows, fields) {
        if (error)
            throw error;
        for (let row of rows) {
            console.log(row.sid, row.title, row.lyrics);
        }
    });
    conn.end();
});
