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

let sql = `SELECT c.Name AS city, c.Population AS population, l.Language AS language
    FROM countrylanguage AS l
    INNER JOIN city AS c
    ON l.CountryCode = c.CountryCode
    WHERE l.IsOfficial = 'T'
    ORDER BY c.Population desc
    LIMIT 10;`;

let html = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <title>연습문제 5</title>
</head>
<body>
<div class="container">
    <h3>전 세계 인구수 TOP 10 도시에서 사용하는 공식 언어는?</h3>
    <hr>
    <table class="table table-striped">
        <tr>
            <th>도시명</th>
            <th>공식언어명</th>
            <th>인구수(명)</th>
        </tr>
`;

let server = http.createServer((req, res) => {
    conn.connect();

    conn.query(sql, function(error, rows, fields) {
        if (error)
            console.log(error);
        for (let row of rows) {
            html += `<tr>
                        <td>${row.city}</td>
                        <td>${row.language}</td>
                        <td>${row.population.toLocaleString()}</td>
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

