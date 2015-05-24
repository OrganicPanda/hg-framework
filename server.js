var express = require('express')
  , mockRest = require('connect-mock-rest')
  , bodyParser = require('body-parser')
  , utils = require('./lib/utils')
  , conf = require('./conf')
  , app = express()
  , port = utils.arg('port') || 3000;

app.use(bodyParser());
app.use(mockRest());

app.use('/' + conf.locations.dest
  , express.static(__dirname + '/dist'));

app.use('/' + conf.locations.vendor
  , express.static(__dirname + '/vendor'));

app.use('/data'
  , express.static(__dirname + '/data'));

app.use('/*'
  , express.static(__dirname + '/public'));

module.exports = function() {
  app.listen(port, function() {
    console.log('server start on port ' + port);
  });
};
