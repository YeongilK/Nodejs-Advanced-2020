const fs = require('fs');
const mysql = require('mysql');

let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

function getConnection() {
    let conn = mysql.createConnection({
        host:   config.host,
        user:   config.user,
        password:   config.password,
        database:   config.database,
        port:   config.port
    });
    conn.connect(function(err) {
        if(err) {
            console.log('mysql connection error : ' + err);
        }
    });
    return conn;
}

/* let sql = `delete from song where sid=?;`; 
let conn = getConnection();

conn.query(sql, 127, function(err, fields) {
    if (err) {
        console.log(err);
    }
});
conn.end(); */

/* let sql = `SELECT * FROM song WHERE sid=?;`;
let conn = getConnection();

conn.query(sql, 133, function(err, rows, fields) {
    if (err) {
        console.log(err);
    }
    console.log(rows[0]);
});
conn.end(); */

/* let conn = getConnection();
let sql = `SELECT s.sid, s.title, g.name, s.lyrics 
FROM song AS s
left JOIN girl_group AS g
ON s.sid=g.hsid
ORDER BY s.sid DESC LIMIT 10;`;

conn.query(sql, (err, rows, fields) => {
    if (err) {
        console.log(err);
    }
    console.log(rows);
});
conn.end(); */

let conn = getConnection();
let sql = `SELECT * FROM girl_group;`;

conn.query(sql, (err, rows, fields) => {
    if (err) {
        console.log(err);
    }
    console.log(rows);
});
conn.end();