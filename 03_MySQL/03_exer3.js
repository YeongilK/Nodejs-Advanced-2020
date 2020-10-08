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

let sql = `SELECT continent, COUNT(*) AS countOfNation, 
    round(SUM(gnp)) AS sumGnp, round(AVG(gnp)) AS avgGnp
    FROM country
    GROUP BY continent;`;
conn.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    console.log('Q. 대륙별 국가수, GNP의 합, 평균 GNP를 구하시오.');
    for (let row of rows) {
        console.log(`
대륙명: ${row.continent}
국가의 수: ${row.countOfNation}개
GNP의 합: ${row.sumGnp.toLocaleString()}
평균 GNP: ${row.avgGnp.toLocaleString()}`);
    }
});

conn.end();