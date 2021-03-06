const mysql = require('mysql');
const fs = require('fs');
const crypto = require('crypto');

let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

let conn = mysql.createConnection({
    host:   config.host,
    user:   config.user,
    password:   config.password,
    database:   config.database,
    port:   config.port
});

let shasum = crypto.createHash('sha256');       //sha256, sha512
shasum.update('1234');
let output = shasum.digest('base64');           // hex, base64

conn.connect();

let params = ['guest3', output, 'guest3'];
let sql = `INSERT INTO users (uid, pwd, uname) VALUES (?, ?, ?);`;

conn.query(sql, params, function(err, fields) {
    if (err) {
        console.log(err);
    }
});
conn.end();