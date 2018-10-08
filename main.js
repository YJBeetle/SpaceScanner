var express = require('express');
var exec = require('child_process').exec;

var app = express();

app.use('/', express.static(__dirname + '/web'));

// app.get('/', function (req, res) {
//   res.send('It works!');
// });

app.listen(3000, function () {
  console.log('Listening on port 3000!');
  exec('open http://localhost:3000');
});
