const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

// 서버를 생성하고 실행합니다.
http.createServer(function (request, response) {
    // 01_ejsPage.ejs 파일을 읽습니다.
    fs.readFile('01_ejsPage.ejs', 'utf8', function(error, data) {
        response.writeHead(200, { 'Content_Type': 'text/html' });
        response.end(ejs.render(data));
    });
}).listen(3000, function() {
    console.log('Server Running at http://127.0.0.1:3000');
});