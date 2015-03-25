var utils = require('./utils');

module.exports = (function() {
  var config = {};

  utils.forEachAM(function(module) {
    if (!module.files.length) return;

    config[module.nameSpace] = {};
    config[module.nameSpace].src = module.dest;
  });

  return config;
})();
