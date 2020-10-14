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

let sql = `SELECT * FROM girl_group;`;

let conn = getConnection();
conn.query(sql, (err, rows, fields) => {
    if (err) {
        console.log(err);
    }
    console.log(rows);
});
conn.end();