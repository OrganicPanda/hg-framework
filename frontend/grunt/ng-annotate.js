var utils = require('./utils');

module.exports = (function() {
  var config = {
    options: {
      singleQuotes: true
    }
  };

  utils.forEachAM(function(module) {
    if (!module.hasJS) return;

    var src = module.src + '/**/*.js';
    var dest = module.dest + '/' + module.name + '.js';

    config[module.nameSpace] = {};
    config[module.nameSpace].files = {};
    config[module.nameSpace].files[dest] = src;
  });

  return config;
})();
