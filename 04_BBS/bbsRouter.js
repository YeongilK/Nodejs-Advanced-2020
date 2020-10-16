const express = require('express');
const bRouter = express.Router();

const dm = require('./db/bbsdb-module');
const am = require('./view/alertMsg');
const ut = require('./util');

bRouter.get('/list', (req, res) => {
    dm.getBbsLists(rows => {
        const view = require('./view/bbsLists');
        let html = view.bbsListForm(req.session.uname, rows);
        res.send(html);
    });
});

bRouter.get('/create', (req, res) => {
    const view = require('./view/bbsCreate');
    let html = view.createBbsForm(req.session.uname);
    res.send(html);
});

bRouter.post('/create', (req, res) => {
    let uid = req.session.uid;
    let title = req.body.title;
    let content = req.body.content;

    let params = [uid, title, content];

    dm.createBbs(params, () => {
        let html = am.alertMsg('작성이 완료되었습니다.', '/bbs/list');
        res.send(html);
    });
});

bRouter.get('/view/:bid', (req, res) => {
    let bid = parseInt(req.params.bid);
    dm.getBbsInfo(bid, result => {
        dm.plusViewCount(bid, () => {
            const view = require('./view/bbsView');
            let html = view.viewBbsForm(result); 
            res.send(html);
        });
    });
});

bRouter.get('/update/:bid/uid/:uid', (req, res) => {
    let bid = req.params.bid;
    let uid = req.params.uid;
    if (uid === req.session.uid) {       // 권한 있는 상태, 자신이 올린 게시글만 수정 가능
        dm.getBbsInfo(bid, result => {
            const view = require('./view/bbsUpdate');
            let html = view.updateBbsForm(req.session.uname, result);
            res.send(html);
        });
    } else {                                        // 권한 없는 상태
        let html = am.alertMsg(`해당 게시글 수정 권한이 없습니다.`, `/bbs/view/${bid}`);
        res.send(html);
    }
});

bRouter.post('/update', (req, res) => {
    let bid = req.body.bid;
    let title = req.body.title;
    let content = req.body.content;

    let params = [title, content, bid];
    dm.updateBbs(params, () => {
        let html = am.alertMsg(`게시글이 수정되었습니다.`, `/bbs/view/${bid}`);
        res.send(html);
    });
});

bRouter.get('/delete/:bid/uid/:uid', (req, res) => {
    let bid = req.params.bid;
    let uid = req.params.uid;

    // 관리자로 로그인하면 회원을 탈퇴시킬 수 있다.
    if (req.session.uid === 'admin') {                  
        dm.deleteBbs(bid, () => {
            res.redirect('/bbs/list');
        });
    } else {
        // 권한 있는 상태, 자기 자신일 때는 삭제 가능
        if (uid === req.session.uid) {
            dm.deleteBbs(bid, () => {
                res.redirect('/bbs/list');
            });
            // 권한 없는 상태
        } else {                                        
            let html = am.alertMsg(`해당 게시글 삭제 권한이 없습니다.`, '/bbs/list');
            res.send(html);
        } 
    }
});

bRouter.post('/search', (req, res) => {
    let keyword = `%${req.body.keyword}%`;

    dm.searchList(keyword, rows => {
        const view = require('./view/bbsSearch');
        let html = view.searchListForm(req.session.uname, keyword, rows); 
        res.send(html);
    });
});

module.exports = bRouter;