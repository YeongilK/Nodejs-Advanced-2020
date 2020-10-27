const fs = require('fs');
const mysql = require('mysql');

let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);
const ut = require('../util');

module.exports = {
    getConnection:  function() {
        let conn = mysql.createConnection({
            host:   config.host,
            user:   config.user,
            password:   config.password,
            database:   config.database,
            port:   config.port
        });
        conn.connect(function(err) {
            if(err) {
                console.log('mysql connection error : ' + err);
            }
        });
        return conn;
    },
    getBbsLists:    function(offset, callback) {
        let conn = this.getConnection();
        let sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content, b.modTime, b.viewCount, b.replyCount
        FROM bbs AS b
        JOIN users AS u
        ON b.uid=u.uid
        WHERE b.isDeleted=0
        ORDER BY b.bid desc
        LIMIT 10 OFFSET ?;`;
    
        conn.query(sql, offset, (err, rows, fields) => {
            if (err) {
                console.log(err);
            }
            callback(rows);
        });
        conn.end();
    },
    getBbsTotalCount:    function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT COUNT(*) AS count FROM bbs WHERE isDeleted=0;`;
        conn.query(sql, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]);   // 주의할 것
        });
        conn.end();
    },
    createBbs:      function(params, callback) {
        let sql = `INSERT INTO bbs (uid, title, content) VALUES (?, ?, ?);`;;
        let conn = this.getConnection();

        conn.query(sql, params, function(err, fields) {
            if (err) {
                console.log(err);
            }
            callback();
        });
        conn.end();
    },
    getBbsInfo:     function(bid, callback) {
        let conn = this.getConnection();
        let sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content,
        DATE_FORMAT(b.modTime, '%Y-%m-%d %T') as modTime, b.viewCount, b.replyCount
        FROM bbs AS b
        JOIN users AS u
        ON b.uid=u.uid
        WHERE b.bid=?;`;
    
        conn.query(sql, bid, (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            callback(results[0]);       // 주의
        });
        conn.end();
    },
    plusViewCount:  function(bid, callback) {
        let conn = this.getConnection();
        let sql = `update bbs set viewCount=viewCount+1 where bid=?;`;
        conn.query(sql, bid, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    updateBbs:      function(params, callback) {
        let conn = this.getConnection();
        let sql = `UPDATE bbs SET title=?, content=?, modTime=now() WHERE bid=?;`;
    
        conn.query(sql, params, (err, fields) => {
            if (err) {
                console.log(err);
            }
            callback();
        });
        conn.end();
    },
    deleteBbs:      function(bid, callback) {
        let conn = this.getConnection();
        let sql = `UPDATE bbs SET isDeleted=1 WHERE bid=?;`;
    
        conn.query(sql, bid, (err, fields) => {
            if (err) {
                console.log(err);
            }
            callback();
        });
        conn.end();
    },
    getSearchList:  function(keyword, callback) {
        let conn = this.getConnection();
        let sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content, 
                    b.modTime, b.viewCount, b.replyCount
                    FROM bbs AS b
                    JOIN users AS u
                    ON b.uid=u.uid
                    WHERE b.isDeleted=0 and b.title like ?
                    ORDER BY b.bid DESC;`;
                    
        conn.query(sql, keyword, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    getReplyInfo:   function(bid, callback) {
        let conn = this.getConnection();
        let sql = `SELECT r.rid, r.bid, r.uid, u.uname, r.content, r.isMine, 
                    DATE_FORMAT(r.regTime, '%Y-%m-%d %T') as regTime
                    FROM reply AS r
                    JOIN users AS u
                    ON r.uid = u.uid
                    WHERE r.bid=?;`;
        conn.query(sql, bid, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    insertReply:    function(params, callback) {
        let conn = this.getConnection();
        let sql = `INSERT INTO reply(bid, uid, content, isMine) VALUES (?, ?, ?, ?);`;
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    plusReplyCount: function(bid, callback) {
        let conn = this.getConnection();
        let sql = `UPDATE bbs SET replyCount=replyCount+1 WHERE bid=?;`;
        conn.query(sql, bid, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getChartList:    function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT b.bid, b.uid, u.uname, b.title, b.viewCount, b.replyCount
        FROM bbs AS b
        JOIN users AS u
        ON b.uid=u.uid
        WHERE b.isDeleted=0
        ORDER BY b.viewCount DESC 
        LIMIT 10;`;
    
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log(err);
            }
            callback(rows);
        });
        conn.end();
    }
}
