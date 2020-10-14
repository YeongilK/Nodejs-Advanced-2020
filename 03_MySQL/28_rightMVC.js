const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const favicon = require('express-favicon');

const dm = require('./db/userdb-module');
const am = require('./view/alertMsg');
const ut = require('./28_util');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('1q2w3e4r5t6y'));      // 아래 session의 secret 속성과 같은 값
app.use(session({
    secret: '1q2w3e4r5t6y',
    resave: false,
    saveUninitialized: true,
    store: new FileStore({logFn: function(){}})
}));

// 조회 화면 출력
app.get('/', ut.isLoggedIn, (req, res) => {
    dm.getAllLists(rows => {
        const view = require('./view/right_list');
        let html = view.mainForm(req.session.uname, rows);
        res.send(html);
    });
});
// 데이터 삭제
app.get('/delete/:uid', ut.isLoggedIn, (req, res) => {
    if (req.params.uid === req.session.uid) {       // 권한 있는 상태, 자기 자신의 정보만 삭제 가능
        dm.deleteUser(req.params.uid, () => {
            res.redirect('/');
        });
    } else {                                        // 권한 없는 상태
        let html = am.alertMsg(`삭제 권한이 없습니다.`, '/');
        res.send(html);
    } 
});

// 데이터 갱신
app.get('/update/:uid', ut.isLoggedIn, (req, res) => {
    if (req.params.uid === req.session.uid) {       // 권한 있는 상태, 자기 자신의 정보만 삭제 가능
        dm.getUserInfo(req.params.uid, (result) => {
            const view = require('./view/user_update');
            let html = view.updateForm(result);
            res.send(html);
        });
    } else {                                        // 권한 없는 상태
        let html = am.alertMsg(`수정 권한이 없습니다.`, '/');
        res.send(html);
    }
});

app.post('/update', ut.isLoggedIn, (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;

    if (pwd === pwd2) {
        let pwdHash = ut.generateHash(pwd);
        let params = [pwdHash, uid];
        dm.updateUser(params, () => {
            res.redirect('/');
        });
    } else {                    // 패스워드 입력이 잘못된 경우
        let html = am.alertMsg('패스워드가 일치하지 않습니다.\\n다시 입력하세요', `/update/${uid}`);
        res.send(html);
    }
});

// 로그인 화면 출력
app.get('/login', (req, res) => {
    const view = require('./view/user_login');
    let html = view.loginForm();
    res.send(html);
});

// 입력한 로그인 정보가 맞는지 체크하는 로직
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

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(3000, function() {
    console.log('Server Running at http://127.0.0.1:3000');
});