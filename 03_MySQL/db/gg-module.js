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
        let sql = `SELECT ggid, name, date_format(debut, "%Y-%m-%d") as debut, hsid
        FROM girl_group order by ggid desc;`;
    
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log(err);
            }
            callback(rows);
        });
        conn.end();
    },
    insertSinger: function(params, callback) {
        let sql = `insert into girl_group(name, debut) values(?, ?);`; 
        let conn = this.getConnection();

        conn.query(sql, params, function(err, fields) {
            if (err) {
                console.log(err);
            }
            callback();
        });
        conn.end();
    },
    deleteSinger: function(ggid, callback) {
        let sql = `delete from girl_group where ggid=?;`; 
        let conn = this.getConnection();

        conn.query(sql, ggid, function(err, fields) {
            if (err) {
                console.log(err);
            }
            callback();
        });
        conn.end();
    },
    getSinger:    function(ggid, callback) {
        let sql = `SELECT * FROM girl_group WHERE ggid=? order by ggid desc;`;
        let conn = this.getConnection();

        conn.query(sql, ggid, function(err, rows, fields) {
            if (err) {
                console.log(err);
            }
            callback(rows[0]);      // 주의할 것
        });
        conn.end();
    },
    updateSinger: function(params, callback) {
        let sql = `update girl_group set name=?, debut=? where ggid=?;`; 
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