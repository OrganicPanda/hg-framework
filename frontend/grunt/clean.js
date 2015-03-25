var utils = require('./utils');

module.exports = (function() {
  var config = {};

  utils.forEachAM(function(module) {
    config[module.nameSpace] = {};
    config[module.nameSpace].src = module.dest;
  });

  return config;
})();
