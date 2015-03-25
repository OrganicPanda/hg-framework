var utils = require('./utils')
  , conf = require('../conf');

module.exports = (function() {
  var config = {
    options: {
      htmlmin: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      module: function(data, moduleName) {
        return 'mis.' + moduleName.replace('-', '.') + '.tpl';
      },
      rename: function(moduleName) {
        return moduleName.replace('../' + conf.locations.src + '/', '');
      }
    }
  };

  utils.forEachAM(function(module) {
    if (!module.hasHTML) return;

    var src = module.src + '/**/*.html';
    var dest = module.dest + '/' + module.name + '-tpl.js';

    config[module.nameSpace] = {};
    config[module.nameSpace].src = src;
    config[module.nameSpace].dest = dest;
  });

  return config;
})();
