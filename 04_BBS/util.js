const crypto = require('crypto');
const moment = require('moment');
const am = require('./view/alertMsg');

module.exports = {
    // 해시값으로 바꿔주는 함수
    generateHash:   function(something) {
        let shasum = crypto.createHash('sha256');   // sha256, sha512
        shasum.update(something);
        return shasum.digest('base64');             // hex, base64
    },
    // 로그인 여부를 확인하는 함수
    isLoggedIn: function(req, res, next) {
        if (!req.session.uid) {        
            let html = am.alertMsg('로그인 정보가 없습니다.\\n로그인 또는 회원가입을 하시기 바랍니다.', '/login');
            res.send(html);
        } else {
            next();         // 다음 미들웨어한테 권한을 줌
        }
    },
    // DB에서 읽은 시간을 오늘이면 시간을 어제까지는 날짜를 반환
    getDisplayTime: function(dt) {
        let today = moment().format('YYYY-MM-DD');
        let dbtime = moment(dt).format('YYYY-MM-DD HH:mm:ss');
        return (dbtime.indexOf(today) == 0) ? dbtime.substring(11) : dbtime.substring(0,10);
    }
}