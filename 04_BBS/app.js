const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uRouter = require('./userRouter');
const bRouter = require('./bbsRouter');

const udm = require('./db/userdb-module');
const bdm = require('./db/bbsdb-module');
const am = require('./view/alertMsg');
const ut = require('./util');

const app = express();
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/@popperjs/core/dist/umd'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/ckeditor', express.static(__dirname + '/public/ckeditor'));
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
app.use('/bbs', bRouter);

app.get('/', ut.isLoggedIn, (req, res) => {
    const view = require('./view/home');
    let html = view.mainForm(req.session.uname, 1);     // 1은 pageNo
    res.send(html);
});

app.get('/login', (req, res) => {
    const view = require('./view/userLogin');
    let html = view.loginForm();
    res.send(html);
});

app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwdHash = ut.generateHash(pwd);

    udm.getUserInfo(uid, result => {
        if (result === undefined || result.isDeleted === 1) {
            let html = am.alertMsg(`Login 실패\\n없는 아이디이거나 탈퇴처리 된 회원입니다.`, '/login');
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
                let html = am.alertMsg(`Login 실패\\n패스워드가 다릅니다.`, '/login');
                res.send(html);
            }
        }
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(3000, function() {
    console.log('Server Running at http://127.0.0.1:3000');
});
