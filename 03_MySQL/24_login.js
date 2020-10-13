const mysql = require('mysql');
const fs = require('fs');
const crypto = require('crypto');

let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

let conn = mysql.createConnection({
    host:   config.host,
    user:   config.user,
    password:   config.password,
    database:   config.database,
    port:   config.port
});

function generateHash(something) {
    let shasum = crypto.createHash('sha256');       // sha256, sha512
    shasum.update(something);
    return shasum.digest('base64');                 // hex, base64
}

// 사용자가 입력한 uid와 pwd를 각각 'admin', '1234'로 가정
let uid = 'admin';      // req.body.uid
let pwd = '1234';       // req.body.pwd
let pwdHash = generateHash(pwd);

conn.connect();

let sql = `SELECT * FROM users WHERE uid LIKE ?;`;

conn.query(sql, uid, function(err, results, fields) {
    if (err) {
        console.log(err);
    }
    let result = results[0];
    console.log(results);
    if (result === undefined) {
        console.log(`Login 실패: uid ${uid} 이/가 없습니다.`);
    } else {
        if (result.pwd === pwdHash) {
            console.log('Login 성공');
        } else {
            console.log('Login 실패: 패스워드가 다릅니다.');
        }
    }
});
conn.end();