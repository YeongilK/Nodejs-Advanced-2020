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

let sql = `SELECT c.Name AS city, c.Population AS population, l.Language AS language
    FROM countrylanguage AS l
    INNER JOIN city AS c
    ON l.CountryCode = c.CountryCode
    WHERE l.IsOfficial = 'T'
    ORDER BY c.Population desc
    LIMIT 10;`;
conn.query(sql, function(error, rows, fields) {
    let i = 1;
    if (error)
        console.log(error);
    console.log('Q. 전 세계 인구수 TOP 10 도시에서 사용하는 공식언어는?');
    for (let row of rows) {
        console.log(`
[Top ${i++}]
도시명: ${row.city}
인구수: ${row.population.toLocaleString()}명
사용하는 공식 언어명: ${row.language}`);
    }
});

conn.end();