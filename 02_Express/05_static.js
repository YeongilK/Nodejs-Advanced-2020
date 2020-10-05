const express = require('express');
const util = require('util');
const app = express();

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Static Image</h1>
        <hr>
        <img src="/cat.jpg" alt="고양이">
        <img src="/img/dog.jpg" alt="개">
    </body>
    </html>
    `;
    res.send(html);
});

app.get('*', (req, res) => {
    res.status(404).send('Path not found');     // method chaining
});

app.listen(3000, function() {
    util.log('Server Running at http://127.0.0.1:3000');
    //console.log('Server Running at http://127.0.0.1:3000');
});