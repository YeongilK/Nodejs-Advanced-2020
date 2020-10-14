const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uRouter = require('./userRouter');

const dm = require('./db/userdb-module');
const am = require('./view/alertMsg');
const ut = require('./util');

const app = express();
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/@popperjs/core/dist/umd'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('1q2w3e4r5t6y'));      // 아래 session의 secret 속성과 같은 값
app.use(session({
    secret: '1q2w3e4r5t6y',
    resave: false,
    saveUninitialized: true,
    store: new FileStore({logFn: function(){}})
}));
app.use('/user', uRouter);

app.get('/', ut.isLoggedIn, (req, res) => {
    fs.readFile('./view/index.html', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.get('/login', (req, res) => {
    const view = require('./view/user_login');
    let html = view.loginForm();
    res.send(html);
});

app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwdHash = ut.generateHash(pwd);

    dm.getUserInfo(uid, result => {
        if (result === undefined) {
            let html = am.alertMsg(`Login 실패!!\\nuid ${uid} 이/가 없습니다.`, '/login');       // 주의: alert창에는 한줄만 출력!
            res.send(html);
        } else {
            if (result.pwd === pwdHash) {
                req.session.uid = uid;
                req.session.uname = result.uname;
                console.log('Login 성공');
                req.session.save(function() {
                    res.redirect('/');
                });
            } else {
                let html = am.alertMsg(`Login 실패!!\\n패스워드가 다릅니다.`, '/login');
                res.send(html);
            }
        }
    });
});

app.listen(3000, function() {
    console.log('Server Running at http://127.0.0.1:3000');
});