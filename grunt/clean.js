var utils = require('../lib/utils')
  , conf = require('../conf');

module.exports = (function() {
  var config = {
    all: utils.location(conf.locations.dest)
  };

  utils.forEachModule(function(module) {
    if (!module.files.all.length) return;

    config[module.nameSpace] = {};
    config[module.nameSpace].src = module.dest;
  });

  return config;
})();
