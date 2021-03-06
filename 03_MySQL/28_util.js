const crypto = require('crypto');
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
            let html = am.alertMsg('로그인 정보가 없습니다\\n로그인 하세요', '/login');
            res.send(html);
        } else {
            next();         // 다음 미들웨어한테 권한을 줌
        }
    }
}