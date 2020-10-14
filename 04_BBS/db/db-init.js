const fs = require('fs');
const mysql = require('mysql');

let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

function getConnection() {
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
}

let sqlUsers = `
CREATE TABLE users (
    uid VARCHAR(20) NOT NULL PRIMARY KEY,
    pwd CHAR(44) NOT NULL,
    uname VARCHAR(20) NOT NULL,
    tel VARCHAR(20),
    email VARCHAR(40),
    regDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    isDeleted INT DEFAULT 0
  );`;

let sqlBbs = `
CREATE TABLE bbs (
    bid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    uid VARCHAR(20) NOT NULL,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(1000),
    modTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    viewCount INT DEFAULT 0,
    isDeleted INT DEFAULT 0,
    FOREIGN KEY(uid) REFERENCES users(uid)
  ) AUTO_INCREMENT=1001;
`;

let sqlReply = `
CREATE TABLE reply (
    rid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    bid INT NOT NULL,
    uid VARCHAR(20) NOT NULL,
    content VARCHAR(100),
    regTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    isMine INT DEFAULT 0,
    FOREIGN KEY(bid) REFERENCES bbs(bid),
    FOREIGN KEY(uid) REFERENCES users(uid)
  );
`;

let conn = getConnection();
conn.query(sqlReply, (err, fields) => {
    if (err) {
        console.log(err);
    }
});
conn.end();