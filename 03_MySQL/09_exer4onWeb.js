const http = require('http');
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

let sql = `SELECT l.Continent AS continent, l.Name AS country, 
    r.Name AS city, r.Population AS population
    FROM country AS l
    INNER JOIN city AS r
    ON l.Code = r.CountryCode
    WHERE l.Continent LIKE 'asia'
    ORDER BY r.Population DESC
    LIMIT 10;`;

let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <title>연습문제 4</title>
</head>
<body>
<div class="container">
    <h3>아시아 대륙에서 인구가 가장 많은 도시 TOP 10</h3>
    <hr>
    <table class="table table-striped">
        <tr>
            <th>대륙명</th>
            <th>국가명</th>
            <th>도시명</th>
            <th>인구수</th>
        </tr>
`;

let server = http.createServer((req, res) => {
    conn.connect();

    conn.query(sql, function(error, rows, fields) {
        if (error)
            console.log(error);
        for (let row of rows) {
            html += `<tr>
                        <td>${row.continent}</td>
                        <td>${row.country}</td>
                        <td>${row.city}</td>
                        <td>${row.population}</td>
                    </tr>`;
        }
        html += `</table>
            </div>
        </body>
        </html>`;
        res.end(html);
    });

    conn.end();
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

