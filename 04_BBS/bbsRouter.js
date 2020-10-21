const express = require('express');
const bRouter = express.Router();

const dm = require('./db/bbsdb-module');
const am = require('./view/alertMsg');
const ut = require('./util');

bRouter.get('/list/:page', ut.isLoggedIn, (req, res) => {
    let uname = req.session.uname;
    let page = parseInt(req.params.page);
    let offset = (page - 1) * 10;

    dm.getBbsTotalCount(result => {
        let totalPage = Math.ceil(result.count / 10);
        let firstPage = Math.floor((page-1) / 10) * 10 + 1;
        let lastPage = Math.ceil(page/10) * 10;
        lastPage = (lastPage > totalPage) ? totalPage : lastPage;
        
        dm.getBbsLists(offset, rows => {
            const view = require('./view/bbsList');
            let html = view.bbsListForm(uname, rows, page, firstPage, lastPage, totalPage);
            res.send(html);
        });
    });
});

bRouter.get('/create', ut.isLoggedIn, (req, res) => {
    const view = require('./view/bbsCreate');
    let html = view.createBbsForm(req.session.uname, 1);
    res.send(html);
});

bRouter.post('/create', ut.isLoggedIn, (req, res) => {
    let uid = req.session.uid;
    let title = req.body.title;
    let content = req.body.content;

    let params = [uid, title, content];

    dm.createBbs(params, () => {
        let html = am.alertMsg('작성이 완료되었습니다.', '/bbs/list/1');
        res.send(html);
    });
});

bRouter.get('/view/:bid', ut.isLoggedIn, (req, res) => {
    let bid = parseInt(req.params.bid);
    let uname = req.session.uname;
    dm.getBbsInfo(bid, result => {
        dm.plusViewCount(bid, () => {
            dm.getReplyInfo(bid, rows => {
                const view = require('./view/bbsView');
                let html = view.viewBbsForm(uname, result, rows, 1); 
                res.send(html);
            });
        });
    });
});

bRouter.get('/update/:bid/uid/:uid', ut.isLoggedIn, (req, res) => {
    let bid = parseInt(req.params.bid);
    let uid = req.params.uid;
    if (uid === req.session.uid) {       // 권한 있는 상태, 자신이 올린 게시글만 수정 가능
        dm.getBbsInfo(bid, result => {
            const view = require('./view/bbsUpdate');
            let html = view.updateBbsForm(req.session.uname, result, 1);
            res.send(html);
        });
    } else {                                        // 권한 없는 상태
        let html = am.alertMsg(`해당 게시글 수정 권한이 없습니다.`, `/bbs/view/${bid}`);
        res.send(html);
    }
});

bRouter.post('/update', ut.isLoggedIn, (req, res) => {
    let bid = parseInt(req.body.bid);
    let title = req.body.title;
    let content = req.body.content;

    let params = [title, content, bid];
    dm.updateBbs(params, () => {
        let html = am.alertMsg(`게시글이 수정되었습니다.`, `/bbs/view/${bid}`);
        res.send(html);
    });
});

bRouter.get('/delete/:bid/uid/:uid', ut.isLoggedIn, (req, res) => {
    let bid = parseInt(req.params.bid);
    let uid = req.params.uid;

    // 관리자로 로그인하면 회원을 탈퇴시킬 수 있다.
    if (req.session.uid === 'admin') {                  
        dm.deleteBbs(bid, () => {
            res.redirect('/bbs/list/1');
        });
    } else {
        // 권한 있는 상태, 자기 자신일 때는 삭제 가능
        if (uid === req.session.uid) {
            dm.deleteBbs(bid, () => {
                res.redirect('/bbs/list/1');
            });
            // 권한 없는 상태
        } else {                                        
            let html = am.alertMsg(`해당 게시글 삭제 권한이 없습니다.`, `/bbs/view/${bid}`);
            res.send(html);
        } 
    }
});

bRouter.post('/search', ut.isLoggedIn, (req, res) => {
    let uname = req.session.uname;
    let keyword = `%${req.body.keyword}%`;

    dm.getSearchList(keyword, rows => {
        const view = require('./view/bbsSearch');
        let html = view.searchListForm(uname, keyword, rows, 1); 
        res.send(html);
    });
});

bRouter.post('/reply', ut.isLoggedIn, (req, res) => {
    let bid = parseInt(req.body.bid);
    let uid = req.session.uid;
    let content = req.body.content;
    let isMine = (uid === req.body.uid) ? 1 : 0;

    console.log(bid, uid, content, isMine);

    let params = [bid, uid, content, isMine];

    dm.insertReply(params, () => {
        dm.plusReplyCount(bid, () => {
            res.redirect(`/bbs/view/${bid}`);
        });
    });
});

module.exports = bRouter;