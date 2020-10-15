const express = require('express');
const uRouter = express.Router();

const dm = require('./db/userdb-module');
const am = require('./view/alertMsg');
const ut = require('./util');
const bRouter = require('./bbsRouter');

uRouter.use('/bbs', bRouter);

uRouter.get('/register', (req, res) => {
    const view = require('./view/userRegister');
    let html = view.registerForm();
    res.send(html);
});

uRouter.post('/register', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let uname = req.body.uname;
    let tel = req.body.tel;
    let email = req.body.email;

    if (pwd !== pwd2) {
        let html = am.alertMsg('패스워드가 다릅니다.\\n다시 입력하세요.', '/user/register');
        res.send(html);
    } else {
        let pwdHash = ut.generateHash(pwd);
        let params = [uid, pwdHash, uname, tel, email];
        dm.registerUser(params, () => {
            let html = am.alertMsg('회원가입 완료.\\n로그인 화면으로 이동합니다.', '/login');
            res.send(html);
        });
    }
});

uRouter.get('/list', (req, res) => {
    if (req.session.uid === 'admin') {          // 관리자는 모든 회원정보 조회 가능.
        dm.getAllLists(rows => {
            const view = require('./view/userLists');
            let html = view.userListForm(req.session.uname, rows);
            res.send(html);
        });
    } else {
        dm.getUserInfo(req.session.uid, (result) => {
            res.redirect(`/user/update/${req.session.uid}`);
        });
    }
    
});

uRouter.get('/delete/:uid', ut.isLoggedIn, (req, res) => {
    // 관리자로 로그인하면 회원을 탈퇴시킬 수 있다.
    if (req.session.uid === 'admin') {                  
        dm.deleteUser(req.params.uid, () => {
            res.redirect('/user/list');
        });
    } else {
        // 권한 있는 상태, 자기 자신일 때는 삭제 가능
        if (req.params.uid === req.session.uid) {
            dm.deleteUser(req.params.uid, () => {
                res.redirect('/');
            });
            // 권한 없는 상태
        } else {                                        
            let html = am.alertMsg(`삭제 권한이 없습니다.`, '/');
            res.send(html);
        } 
    }
});

uRouter.get('/update/:uid', ut.isLoggedIn, (req, res) => {
    if (req.params.uid === req.session.uid) {       // 권한 있는 상태, 자기 자신의 정보만 삭제 가능
        dm.getUserInfo(req.params.uid, (result) => {
            const view = require('./view/userUpdate');
            let html = view.updateForm(result);
            res.send(html);
        });
    } else {                                        // 권한 없는 상태
        let html = am.alertMsg(`수정 권한이 없습니다.`, '/user/list');
        res.send(html);
    }
});

uRouter.post('/update', ut.isLoggedIn, (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let tel = req.body.tel;
    let email = req.body.email;

    if (pwd === pwd2) {
        let pwdHash = ut.generateHash(pwd);
        let params = [pwdHash, tel, email, uid];
        dm.updateUser(params, () => {
            res.redirect('/');
        });
    } else {                    // 패스워드 입력이 잘못된 경우
        let html = am.alertMsg('패스워드가 일치하지 않습니다.\\n다시 입력하세요', `/user/update/${uid}`);
        res.send(html);
    }
});

module.exports = uRouter;