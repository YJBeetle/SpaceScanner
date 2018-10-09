const PORT = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;

const du = require('./du');

var app = express();

let postParserJson = (req, res, next) => {
    bodyParser.json({
        limit: '1mb',
    })(req, res, next);
}
app.use('/', postParserJson);   //post解析

app.post('/du/stats', function (req, res) {
    res.send('It works!');
});

app.use('/', express.static(__dirname + '/web'));

app.listen(PORT, function () {
    console.log('Listening on port ' + PORT + '!');
    // exec('open http://localhost:' + PORT);
});

let duobj=new du();
duobj.start('/opt')
.then(()=>{
    console.log(duobj.usageData);
});
