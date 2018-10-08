const PORT = 3000;

const express = require('express');
const exec = require('child_process').exec;

const du = require('./du');

var app = express();

app.get('/q', function (req, res) {
    res.send('It works!');
});

app.use('/', express.static(__dirname + '/web'));

app.listen(PORT, function () {
    console.log('Listening on port ' + PORT + '!');
    exec('open http://localhost:' + PORT);
});

du('/opt');
