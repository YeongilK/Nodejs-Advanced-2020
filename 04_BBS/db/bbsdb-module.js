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
    getBbsLists:    function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT bid, title, content, uid, viewCount DATE_FORMAT(modTime, "%Y-%m-%d %T") AS modTime
        FROM users where isDeleted=0 ORDER BY modTime LIMIT 10;`;
    
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log(err);
            }
            callback(rows);
        });
        conn.end();
    }
}