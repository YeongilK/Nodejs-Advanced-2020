const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const dm = require('./db/db-module');
const am = require('./view/alertMsg');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('1q2w3e4r5t6y'));      // 아래 session의 secret 속성과 같은 값
app.use(session({
    secret: '1q2w3e4r5t6y',
    resave: false,
    saveUninitialized: true,
    store: new FileStore({logFn: function(){}})
}));

// 조회 화면 출력
app.get('/', (req, res) => {
    console.log(req.session.uid);

    if (!req.session.uid) {        
        let html = am.alertMsg('로그인 정보가 없습니다\\n로그인 하세요', '/login');
        res.send(html);
    } else {                    // 로그인 된 상태
        dm.getAllLists(rows => {
            const view = require('./view/ss_home');
            let html = view.mainForm(req.session.uname, rows);
            res.send(html);
        });
    }
});

// 로그인 화면 출력
app.get('/login', (req, res) => {
    const view = require('./view/ss_login');
    let html = view.loginForm();
    res.send(html);
});

// 입력한 로그인 정보가 맞는지 체크하는 로직
app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwdHash = dm.generateHash(pwd);

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

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/sample', (req, res) => {
    const view = require('./view/sample');
    let html = view.sampleForm(req.session.uname);
    res.send(html);
});

app.get('/history', (req, res) => {
    const view = require('./view/history');
    let html = view.historyForm(req.session.uname);
    res.send(html);
});

app.get('/android', (req, res) => {
    const view = require('./view/android');
    let html = view.androidForm(req.session.uname);
    res.send(html);
});

app.get('/iphone', (req, res) => {
    const view = require('./view/iphone');
    let html = view.iphoneForm(req.session.uname);
    res.send(html);
});

app.get('/note20', (req, res) => {
    const view = require('./view/note20');
    let html = view.note20Form(req.session.uname);
    res.send(html);
});

app.get('/zfold2', (req, res) => {
    const view = require('./view/zfold2');
    let html = view.zfold2Form(req.session.uname);
    res.send(html);
});

app.get('/zflip', (req, res) => {
    const view = require('./view/zflip');
    let html = view.zflipForm(req.session.uname);
    res.send(html);
});

app.get('/iphone12', (req, res) => {
    const view = require('./view/iphone12');
    let html = view.iphone12Form(req.session.uname);
    res.send(html);
});


app.listen(3000, function() {
    console.log('Server Running at http://127.0.0.1:3000');
});