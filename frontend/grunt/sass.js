var utils = require('./utils');

module.exports = (function() {
  var config = {
    options: {
      sourcemap: true,
      noCache: true
    }
  };

  utils.forEachAM(function(module) {
    if (!module.hasSCSS) return;

    var src = module.src + '/**/*.scss';
    var dest = module.dest + '/' + module.name + '.css';

    config[module.nameSpace] = {};
    config[module.nameSpace].files = {};
    config[module.nameSpace].files[dest] = src;
  });

  return config;
})();
