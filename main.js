const express = require('express');
const exec = require('child_process').exec;

const du = require('./du');

var app = express();

app.get('/q', function (req, res) {
    res.send('It works!');
});

app.use('/', express.static(__dirname + '/web'));

app.listen(3000, function () {
    console.log('Listening on port 3000!');
    exec('open http://localhost:3000');
});

du('/opt');
