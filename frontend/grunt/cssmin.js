var utils = require('./utils');

module.exports = (function() {
  var config = {};

  utils.forEachAM(function(module) {
    if (!utils.includesFileType(module.files, /.scss$/)) return;

    var src = module.dest + '/' + module.name + '.css';
    var dest = module.dest + '/' + module.name + '.min.css';

    config[module.nameSpace] = {};
    config[module.nameSpace].files = {};
    config[module.nameSpace].files[dest] = src;
  });

  return config;
})();
