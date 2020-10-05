const express = require('express');
const util = require('util');
const app = express();

app.get('/', function(req, res) {
    let agent = req.header('User-Agent');

    if (agent.toLowerCase().match(/chrome/)) {
        res.send('크롬 브라우저입니다.');
    } else {
        res.send('크롬 브라우저가 아닙니다.');
    }
    res.send(`<h2>${agent}</h2>`);
});


app.get('*', (req, res) => {
    res.status(404).send('Path not found');     // method chaining
});

app.listen(3000, function() {
    util.log('Server Running at http://127.0.0.1:3000');
    //console.log('Server Running at http://127.0.0.1:3000');
});