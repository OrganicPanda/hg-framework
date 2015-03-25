var utils = require('./utils');

module.exports = (function() {
  var config = {
    options: {
      browsers: [
        '> 1%',
        'last 2 versions'
      ],
      map: true
    }
  };

  utils.forEachAM(function(module) {
    if (!module.hasSCSS) return;

    var src = module.dest + '/' + module.name + '.css';
    var dest = module.dest + '/' + module.name + '.css';

    config[module.nameSpace] = {};
    config[module.nameSpace].src = src;
    config[module.nameSpace].dest = dest;
  });

  return config;
})();
