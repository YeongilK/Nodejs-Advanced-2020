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

let sql = `SELECT g.name AS name, date_format(g.debut, '%Y-%m-%d') AS debutDate, s.title AS title 
    FROM girl_group AS g
    JOIN song AS s
    ON g.hit_song_id = s.sid
    WHERE g.debut BETWEEN '2009-01-01' AND '2009-12-31'
    order by debutDate;`;
conn.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    console.log('Q. 2009년도에 데뷔한 걸그룹과 히트곡은?');
    for (let row of rows) {
        console.log(`그룹명: ${row.name} / 데뷔일자: ${row.debutDate} / 히트곡: ${row.title}`);
    }
});

conn.end();