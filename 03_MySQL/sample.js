const mysql = require('mysql');
//const fs = require('fs');
//let info = fs.readFileSync('./mysql.json', 'utf8');
//let connInfo = JSON.parse(info);
let connInfo = JSON.parse(require('fs').readFileSync('./mysql.json', 'utf8'));

let conn = mysql.createConnection({
    host:   connInfo.host,
    user:   connInfo.user,
    password:   connInfo.password,
    database:   connInfo.database,
    port:   connInfo.port
});

conn.connect();

let sql = `select * from city 
    where population > 9000000
    order by population desc;`;
conn.query(sql, function(error, rows, fields) {
    if (error)
        throw error;
    for (let row of rows) {
        console.log(`${row.Name} / ${row.District} / ${row.Population}`);
    }
});

conn.end();