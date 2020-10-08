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

let sql = `SELECT continent, COUNT(*) AS countOfNation, 
    round(SUM(gnp)) AS sumGnp, round(AVG(gnp)) AS avgGnp
    FROM country
    GROUP BY continent;`;

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
    <title>연습문제 3</title>
</head>
<body>
<div class="container">
    <h3>대륙별 국가 수, GNP 합, 평균 GNP</h3>
    <hr>
    <table class="table table-striped">
        <tr>
            <th>대륙명</th>
            <th>국가수</th>
            <th>GNP 합</th>
            <th>평균 GNP</th>
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
                        <td>${row.countOfNation}</td>
                        <td>${row.sumGnp}</td>
                        <td>${row.avgGnp}</td>
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

