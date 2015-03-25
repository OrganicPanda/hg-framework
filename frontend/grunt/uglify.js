var utils = require('./utils');

module.exports = (function() {
  var config = {
    options: {
      sourceMap: true,
      compress: {
        warnings: false
      }
    }
  };

  utils.forEachAM(function(module) {
    if (!module.hasJS) return;

    var dest = module.dest + '/' + module.name + '.min.js';
    var srcs = [
      module.dest + '/' + module.name + '.js',
      module.dest + '/' + module.name + '-tpl.js'
    ];

    config[module.nameSpace] = {};
    config[module.nameSpace].files = {};
    config[module.nameSpace].files[dest] = srcs;
  });

  return config;
})();
