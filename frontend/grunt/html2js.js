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
      module: function(data, name) {
        return conf.app.nameSpace + '.' + name.replace('-', '.') + '.tpl';
      },
      rename: function(name) {
        return name.replace('../' + conf.locations.src + '/', '');
      }
    }
  };

  utils.forEachModule(function(module) {
    if (!module.hasHTML) return;

    var dest = module.dest + '/' + module.name + '-tpl.js';
    var src = module.files.html.map(function(file) {
      return module.src + '/' + file;
    });

    config[module.nameSpace] = {};
    config[module.nameSpace].src = src;
    config[module.nameSpace].dest = dest;

  });

  return config;
})();
