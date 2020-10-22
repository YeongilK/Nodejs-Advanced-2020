const fs = require('fs');
const mysql = require('mysql');

let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

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
    getAllLists:    function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT uid, uname, photo, tel, email, DATE_FORMAT(regDate, "%Y-%m-%d %T") AS regDate
        FROM users where isDeleted=0 ORDER BY regDate;`;
    
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log(err);
            }
            callback(rows);
        });
        conn.end();
    },
    getUserTotalCount:    function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT COUNT(*) AS count FROM users where isDeleted=0;`;
    
        conn.query(sql, (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            callback(results[0]);
        });
        conn.end();
    },
    getUserInfo:    function(uid, callback) {
        let conn = this.getConnection();
        let sql = `SELECT uid, pwd, uname, tel, email, DATE_FORMAT(regDate, "%Y-%m-%d %T") AS regDate, isDeleted, photo
        FROM users WHERE uid LIKE ?;`;
    
        conn.query(sql, uid, (err, results, fields) => {
            if (err) {
                console.log(err);
            }
            callback(results[0]);       // 주의
        });
        conn.end();
    },
    registerUser: function(params, callback) {
        let sql = `insert into users(uid, pwd, uname, tel, email, photo) values(?, ?, ?, ?, ?, ?);`; 
        let conn = this.getConnection();

        conn.query(sql, params, function(err, fields) {
            if (err) {
                console.log(err);
            }
            callback();
        });
        conn.end();
    },
    updateUser: function(params, photo, uid, callback) {
        let sql;
        if (photo) {
            sql = `UPDATE users SET uname=?, pwd=?, tel=?, email=?, photo=? WHERE uid LIKE ?;`;
            params.push(photo);
            params.push(uid);
        } else {
            sql = `UPDATE users SET uname=?, pwd=?, tel=?, email=? WHERE uid LIKE ?;`;
            params.push(uid);
        }
        let conn = this.getConnection();
    
        conn.query(sql, params, (err, fields) => {
            if (err) {
                console.log(err);
            }
            callback();       // 주의
        });
        conn.end();
    },
    deleteUser: function(uid, callback) {
        let conn = this.getConnection();
        let sql = `UPDATE users SET isDeleted=1 WHERE uid LIKE ?;`;
    
        conn.query(sql, uid, (err, fields) => {
            if (err) {
                console.log(err);
            }
            callback();       // 주의
        });
        conn.end();
    }
}