const express = require('express');
const multer = require('multer');
const uRouter = express.Router();

const dm = require('./db/userdb-module');
const am = require('./view/alertMsg');
const ut = require('./util');
const bRouter = require('./bbsRouter');

uRouter.use('/bbs', bRouter);
uRouter.use(express.static(__dirname + '/public'));

const upload = multer({
    storage: multer.diskStorage({
        // set a localstorage destination
        destination: __dirname + '/public/upload/',
        // set a file name
        filename: (req, file, cb) => {
            cb(null, new Date().toISOString().replace(/[-:\.A-Z]/g, '') + '_' + file.originalname);
        }
    })
});


uRouter.get('/register', (req, res) => {
    const view = require('./view/userRegister');
    let html = view.registerForm();
    res.send(html);
});

uRouter.post('/register', upload.single('photo'), (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let uname = req.body.uname;
    let tel = req.body.tel;
    let email = req.body.email;
    //console.log(req.file);
    let photo = req.file ? req.file.filename : 'blank.png';

    if (pwd !== pwd2) {
        let html = am.alertMsg('패스워드를 정확히 입력하세요.', '/user/register');
        res.send(html);
    } else {
        let pwdHash = ut.generateHash(pwd);
        let params = [uid, pwdHash, uname, tel, email, photo];
        dm.registerUser(params, () => {
            let html = am.alertMsg('회원가입 완료.\\n로그인 화면으로 이동합니다.', '/login');
            res.send(html);
        });
    }
});

uRouter.get('/list', ut.isLoggedIn, (req, res) => {
    let uid = req.session.uid;
    let uname = req.session.uname;
    // 관리자는 모든 회원정보 조회 할 수 있는 화면 출력
    if (uid === 'admin') {        
        dm.getUserTotalCount(result => {
            dm.getAllLists(rows => {
                const view = require('./view/userLists');
                let html = view.userListForm(uname, 1, rows, result);
                res.send(html);
            });
        });
        // 관리자가 아닌 아이디로 접속하면 자기 자신의 정보 변경 화면 출력
    } else {
        dm.getUserInfo(uid, result => {
            res.redirect(`/user/update/${uid}`);
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
    if (req.params.uid === req.session.uid) {       // 권한 있는 상태, 자기 자신의 정보만 수정 가능
        dm.getUserInfo(req.params.uid, result => {
            //console.log(result);
            const view = require('./view/userUpdate');
            let html = view.updateUserForm(result);
            res.send(html);
        });
    } else {                                        // 권한 없는 상태
        let html = am.alertMsg(`수정 권한이 없습니다.`, '/user/list');
        res.send(html);
    }
});

uRouter.post('/update', ut.isLoggedIn, upload.single('photo'), (req, res) => {
    let uid = req.body.uid;
    let uname = req.body.uname;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let pwdHash = req.body.pwdHash;
    let tel = req.body.tel;
    let email = req.body.email;
    //console.log(req.file);
    let photo = req.file ? req.file.filename : 'blank.png';

    if (pwd && pwd !== pwd2) {
        let html = am.alertMsg('패스워드가 일치하지 않습니다.\\n다시 입력하세요', `/user/update/${uid}`);
        res.send(html);
    } else {
        if (pwd)
            pwdHash = ut.generateHash(pwd);
        let params = [uname, pwdHash, tel, email];
        dm.updateUser(params, photo, uid, () => {
            res.redirect(`/user/view/${uid}`);
        });
    }
});

uRouter.get('/view/:uid', ut.isLoggedIn, (req, res) => {
    let uid = req.params.uid;
    dm.getUserInfo(uid, result => {
        const view = require('./view/userView');
        let html = view.viewUserForm(result);
        res.send(html);
    });
});

module.exports = uRouter;