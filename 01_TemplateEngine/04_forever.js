const { report } = require('process');

require('http').createServer(function(request, response) {
    if (request.url === '/') {
        let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Forever</h1>
        </body>
        </html>
        `;
        response.end(html);
    } else {
        // 오류를 발생합니다.
        error.error.error();
    }
}).listen(3000, function() {
    console.log('Server Running at http://127.0.0.1:3000');
});