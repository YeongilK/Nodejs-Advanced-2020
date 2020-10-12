const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');
const mysql = require('mysql');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

function getConnection() {
    let conn = mysql.createConnection({
        host:   config.host,
        user:   config.user,
        password:   config.password,
        database:   config.database,
        port:   config.port
    });
    conn.connect(function(err) {
        if(err) {
            console.log('mysql connection error : ' + err);
        }
    });
    return conn;
}

app.get('/', (req, res) => {
    let sql = `SELECT * FROM song ORDER BY sid DESC LIMIT 5;`;
    let html = fs.readFileSync('13_list.html', 'utf8');
    let conn = getConnection();

    conn.query(sql, (err, rows, fields) => {
        for (let row of rows) {
            html += `<tr>
                        <td>${row.sid}</td>
                        <td>${row.title}</td>
                        <td>${row.lyrics}</td>
                    </tr>`;
        }
        html += `   </table>
                </div>
                </body>
                </html>`;
        res.end(html);
    });
    conn.end();
});

app.get('/insert', (req, res) => {
    fs.readFile('13_song.html', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/insert', (req, res) => {
    let title = req.body.title;
    let lyrics = req.body.lyrics;
    let sql = `insert into song(title, lyrics) values(?, ?);`; 
    let params = [title, lyrics];
    let conn = getConnection();

    conn.query(sql, params, function(err, fields) {
        if (err)
            console.log(err);
        res.redirect('/');
    });
    conn.end();
});

app.listen(3000, function() {
    util.log('Server Running at http://127.0.0.1:3000');
});