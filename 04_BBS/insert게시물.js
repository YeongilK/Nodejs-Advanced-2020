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

let params = ['admin', 'Pagination 시험용', '개수늘리기'];
let sql = `INSERT INTO bbs (uid, title, content) VALUES (?, ?, ?);`;

conn.query(sql, params, function(err, fields) {
    if (err) {
        console.log(err);
    }
});
conn.end();