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

/* let sqlUsers = `
CREATE TABLE users (
    uid VARCHAR(20) NOT NULL PRIMARY KEY,
    pwd CHAR(44) NOT NULL,
    uname VARCHAR(20) NOT NULL,
    tel VARCHAR(20),
    email VARCHAR(40),
    regDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    isDeleted INT DEFAULT 0
  );`; */

/* let sqlBbs = `
CREATE TABLE bbs (
    bid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    uid VARCHAR(20) NOT NULL,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(1000),
    modTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    viewCount INT DEFAULT 0,
    isDeleted INT DEFAULT 0,
    FOREIGN KEY(uid) REFERENCES users(uid)
  ) AUTO_INCREMENT=1001;`;*/

/* let sqlReply = `
CREATE TABLE reply (
    rid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    bid INT NOT NULL,
    uid VARCHAR(20) NOT NULL,
    content VARCHAR(100),
    regTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    isMine INT DEFAULT 0,
    FOREIGN KEY(bid) REFERENCES bbs(bid),
    FOREIGN KEY(uid) REFERENCES users(uid)
  );`; */
  
/* let conn = getConnection();
conn.query(sqlUsers, (err, fields) => {
    if (err) {
        console.log(err);
    }
});
conn.end(); */

/* let users = [
    ['park', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', '박주영', '010-1234-5678', 'park@naver.com'],
    ['lee', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', '이근', '010-1212-1212', 'KenRhee@naver.com'],
    ['choi', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', '최강현', '010-1235-5679', 'hoseo@hoseo.com'],
    ['aaa', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', 'guest1', '010-2654-1253', 'hoseo1@hoseo.com'],
    ['bbb', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', 'guest2', '02-2222-2222', 'hoseo2@hoseo.com'],
    ['ccc', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', 'guest3', '02-3333-3333', 'hoseo3@hoseo.com'],
    ['ddd', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', 'guest4', '02-4444-4444', 'hoseo4@hoseo.com'],
    ['eee', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=', 'guest5', '02-5555-5555', 'hoseo5@hoseo.com']
];
let sqlRegister = `insert into users(uid, pwd, uname, tel, email) values(?,?,?,?,?);`;
let conn = getConnection();
for (let params of users) {
    conn.query(sqlRegister, params, function(error, fields) {
        if (error)
            console.log(error);
    });
}
conn.end(); */

/* let bbsArray = [
    ['admin', '미스터 션샤인', `2018년 방영한, 구한말을 배경으로 하는 한국 드라마.`],
    ['admin', '도깨비', `불멸의 삶을 끝내기 위해 인간 신부가 필요한 도깨비(공유)와 그와 함께 기묘한 동거를 시작한 기억상실증 저승사자(이동욱). 그런 그들 앞에 '도깨비 신부'라 주장하는 '죽었어야 할 운명'의 소녀 지은탁(김고은)이 나타나며 벌어지는 신비로운 낭만설화이다.`],
    ['admin', '태양의 후예', `낯선 땅 극한의 환경 속에서 사랑과 성공을 꿈꾸는 젊은 군인과 의사들을 통해 삶의 가치를 담아낸 블록버스터급 휴먼 멜로 드라마`],
    ['admin', '시크릿 가든', `싸가지 없는 부잣집 도련님과 스턴트맨으로 하루하루 간신히 살아가는 도시 빈민 아가씨의 연애라는 진부하기 짝이 없는 설정, 거기에 남녀의 영혼이 뒤바뀐다는 클리셰를 사용하였다.`],
    ['admin', '파리의 연인', `"애기야 가자"
    "저 남자가 내 사람이다. 저 남자가 내 애인이다 왜 말을 못하냐고!"`],
    ['admin', '슬기로운 의사생활', `누군가는 태어나고 누군가는 삶을 끝내는, 인생의 축소판이라 불리는 병원에서 평범한 듯 특별한 하루하루를 살아가는 사람들과 눈빛만 봐도 알 수 있는 20년지기 친구들의 케미스토리를 담은 드라마. 99학번 의대 동기 다섯 명을 중심으로 펼쳐지는 병원에서의 이야기를 그린다.`]
];
let sqlInsert = `insert into bbs(uid, title, content) values(?,?,?);`;
let conn = getConnection();
for (let params of bbsArray) {
    conn.query(sqlInsert, params, function(error, fields) {
        if (error)
            console.log(error);
    });
}
conn.end(); */

/* let replyArray = [
    [1002, 'park', '좋습니다. 매우 훌륭한 작품입니다.'],
    [1003, 'choi', '매우매우 훌륭합니다.'],
    [1005, 'lee', '너무 좋은 작품입니다. 잘 보았어요.']
];
let sqlInsertReply = `insert into reply(bid, uid, content) values(?,?,?);`;
let conn = getConnection();
for (let params of replyArray) {
    conn.query(sqlInsertReply, params, function(error, fields) {
        if (error)
            console.log(error);
    });
}
conn.end(); */

let bbsReply = [
    [3, 1, 1002], [2, 1, 1003], [4, 1, 1005]
];
let replyUpdate = `update bbs set viewCount=?, replyCount=? where bid=?;`;

let conn = getConnection();
for (let params of bbsReply) {
    conn.query(replyUpdate, params, function(error, fields) {
        if (error)
            console.log(error);
    });
}
conn.end();