const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    //res.send('<h2>3초 후 로그인 페이지로 이동합니다.</h2>');
    setTimeout(() => {
        res.redirect('/login')
    }, 3000);
});

app.get('/login', (req, res) => {
    fs.readFile('09_loginForm.html', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    util.log(uid, pwd);
    if (uid === 'park' && pwd === '1234') {
        res.send('<h1>Login Success</h1>');
    } else {
        res.redirect('/login');
    }
});

app.listen(3000, function() {
    util.log('Server Running at http://127.0.0.1:3000');
});