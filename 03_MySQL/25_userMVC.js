const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/userdb-module');
const am = require('./view/alertMsg');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

// 조회 화면 출력
app.get('/', (req, res) => {
    dm.getAllLists(rows => {
        const view = require('./view/user_list');
        let html = view.mainForm(rows);
        res.send(html);
    });
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
    let pwdHash = dm.generateHash(pwd);

    dm.getUserInfo(uid, result => {
        if (result === undefined) {
            let html = am.alertMsg(`Login 실패: uid ${uid} 이/가 없습니다.`, '/login');       // 주의: alert창에는 한줄만 출력!
            res.send(html);
        } else {
            if (result.pwd === pwdHash) {
                console.log('Login 성공');
                res.redirect('/');
            } else {
                let html = am.alertMsg(`Login 실패: 패스워드가 다릅니다.`, '/login');
                res.send(html);
            }
        }
    });
});

app.listen(3000, function() {
    console.log('Server Running at http://127.0.0.1:3000');
});