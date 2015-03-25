var utils = require('./utils');

module.exports = (function() {
  var config = {
    options: {
      livereload: true
    }
  };

  utils.forEachAM(function(module) {
    config[module.nameSpace] = {};
    config[module.nameSpace].files = [
      module.src + '/**/*.html',
      module.src + '/**/*.js',
      module.src + '/**/*.scss'
    ];
    config[module.nameSpace].tasks = [
      'clean:' + module.nameSpace,
      'ngAnnotate:' + module.nameSpace,
      'html2js:' + module.nameSpace,
      'uglify:' + module.nameSpace,
      'sass:' + module.nameSpace,
      'autoprefixer:' + module.nameSpace,
      'cssmin:' + module.nameSpace
    ];
  });

  return config;
})();
