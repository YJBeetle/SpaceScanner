const PORT = 4000;

const express = require('express');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;

const du = require('./du');

var app = express();
let diskUsages = [];

//允许跨域
let acao = function (req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
        // 'Access-Control-Allow-Credentials': 'true',
    });
    next();
}
app.use('/', acao);   //全部

let postParserJson = (req, res, next) => {
    bodyParser.json({
        limit: '1mb',
    })(req, res, next);
}
app.use('/', postParserJson);   //post解析,存入req.body

app.get('/du', function (req, res) {
    res.send('It works!');
});

app.post('/du/new', function (req, res) {
    newdo = new du(req.body.filePath);
    newdo.start();
    diskUsages.push(newdo);
    return res.json('ok');
});

app.post('/du/list', function (req, res) {
    let list = diskUsages.map((valus, index) => {
        return index;
    })
    return res.json(list);
});

app.use('/', express.static(__dirname + '/web'));

app.listen(PORT, function () {
    console.log('Listening on port ' + PORT + '!');
    // exec('open http://localhost:' + PORT);
});

