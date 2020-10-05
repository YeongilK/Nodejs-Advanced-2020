const http = require('http');
const fs = require('fs');
const jade = require('jade');

http.createServer(function (request, response) {
    fs.readFile('03_jadePage.jade', 'utf8', function(error, data) {
        let fn = jade.compile(data);

        response.writeHead(200, { 'Content_Type': 'text/html' });
        response.end(fn());
    });
}).listen(3000, function() {
    console.log('Server Running at http://127.0.0.1:3000');
});