var express = require('express')
  , argv = require('minimist')(process.argv.slice(2))
  , app = express()
  , server
  , port = argv.port || 3000;

app.use('/dist', express.static(__dirname + '/../dist/'));
app.use('/vendor', express.static(__dirname + '/../vendor/'));
app.use('/', express.static(__dirname + '/../public'));

server = app.listen(port, function() {
  console.log('server start on port ' + port);
});

module.exports = server;
