var express = require('express');

var app = express();

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('',express.static(__dirname + '/views'));


app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/table', function (req, res) {
  res.render('table-example.html');
});


app.listen(52080, function () {
  console.log('smartfarm v2.0.0');
});