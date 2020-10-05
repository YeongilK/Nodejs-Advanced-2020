const express = require('express');
const util = require('util');
const app = express();

// app.use()
// app.get() : GET방식
// app.post() : POST방식
app.use(function(req, res) {
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Welcome to Express World</h1>
    </body>
    </html>
    `;
    res.send(html);
});
app.listen(3000, function() {
    // util을 쓰면 시간, 날짜가 같이 출력된다.
    util.log('Server Running at http://127.0.0.1:3000');
    //console.log('Server Running at http://127.0.0.1:3000');
});