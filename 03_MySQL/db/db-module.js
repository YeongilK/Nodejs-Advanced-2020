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
        let sql = `SELECT * FROM song ORDER BY sid DESC LIMIT 5;`;
    
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log(err);
            }
            callback(rows);
        });
        conn.end();
    },
    getJoinLists:    function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT s.sid, s.title, g.name, s.lyrics 
        FROM song AS s
        left JOIN girl_group AS g
        ON s.sid=g.hit_song_id
        ORDER BY s.sid DESC LIMIT 10;`;
    
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log(err);
            }
            callback(rows);
        });
        conn.end();
    },
    insertSong: function(params, callback) {
        let sql = `insert into song(title, lyrics) values(?, ?);`; 
        let conn = this.getConnection();

        conn.query(sql, params, function(err, fields) {
            if (err) {
                console.log(err);
            }
            callback();
        });
        conn.end();
    },
    deleteSong: function(sid, callback) {
        let sql = `delete from song where sid=?;`; 
        let conn = this.getConnection();

        conn.query(sql, sid, function(err, fields) {
            if (err) {
                console.log(err);
            }
            callback();
        });
        conn.end();
    },
    getSong:    function(sid, callback) {
        let sql = `SELECT * FROM song WHERE sid=?;`;
        let conn = this.getConnection();

        conn.query(sql, sid, function(err, rows, fields) {
            if (err) {
                console.log(err);
            }
            callback(rows[0]);      // 주의할 것
        });
        conn.end();
    },
    updateSong: function(params, callback) {
        let sql = `update song set title=?, lyrics=? where sid=?;`; 
        let conn = this.getConnection();

        conn.query(sql, params, function(err, fields) {
            if (err) {
                console.log(err);
            }
            callback();
        });
        conn.end();
    }
}