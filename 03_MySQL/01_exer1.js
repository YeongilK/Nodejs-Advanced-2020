const mysql = require('mysql');
const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8');
let connInfo = JSON.parse(info);


let conn = mysql.createConnection({
    host:   connInfo.host,
    user:   connInfo.user,
    password:   connInfo.password,
    database:   connInfo.database,
    port:   connInfo.port
});

conn.connect();

let sql = `SELECT name, date_format(debut, '%Y-%m-%d') as debutDate
    FROM girl_group
    WHERE debut BETWEEN '2009-01-01' AND '2009-12-31'
    order by debutDate;`;
conn.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    console.log('Q. 2009년도에 데뷔한 걸그룹과 데뷔일자는?');
    for (let row of rows) {
        console.log(`그룹명: ${row.name} / 데뷔 일자: ${row.debutDate}`);
    }
});

conn.end();