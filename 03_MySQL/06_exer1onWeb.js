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

let sql = `SELECT name, date_format(debut, '%Y-%m-%d') as debutDate
    FROM girl_group
    WHERE debut BETWEEN '2009-01-01' AND '2009-12-31'
    order by debutDate;`;

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
    <title>연습문제 1</title>
</head>
<body>
<div class="container">
    <h3>2009년도에 데뷔한 걸그룹은?</h3>
    <hr>
    <table class="table table-striped">
        <tr>
            <th>그룹명</th>
            <th>데뷔일</th>
        </tr>
`;

let server = http.createServer((req, res) => {
    conn.connect();

    conn.query(sql, function(error, rows, fields) {
        if (error)
            console.log(error);
        for (let row of rows) {
            html += `<tr>
                        <td>${row.name}</td>
                        <td>${row.debutDate}</td>
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

