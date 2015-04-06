var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var passport = require('passport');

var config = require('./config');
// var authentication = require('./authentication');

var app = express();

mongoose.connect(config.mongo.address());
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    process.exit(0);
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(passport.initialize());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'x-access-token');
  next();
});

app.use('/', require('./routes'));

app.listen(config.server.port);

console.log('API running on port: ' + config.server.port);
