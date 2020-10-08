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

let sql = `SELECT l.Continent AS continent, l.Name AS country, 
    r.Name AS city, r.Population AS population
    FROM country AS l
    INNER JOIN city AS r
    ON l.Code = r.CountryCode
    WHERE l.Continent LIKE 'asia'
    ORDER BY r.Population DESC
    LIMIT 10;`;
conn.query(sql, function(error, rows, fields) {
    let i = 1;
    if (error)
        console.log(error);
    console.log('Q. 아시아 대륙에서 인구가 가장 많은 도시 TOP 10');
    for (let row of rows) {
        console.log(`
[Top ${i++}]
대륙명: ${row.continent}
국가명: ${row.country}
도시명: ${row.city}
인구수: ${row.population.toLocaleString()}명`);
    }
});

conn.end();