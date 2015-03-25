var utils = require('./utils');

module.exports = (function() {
  var config = {
    options: {
      livereload: true
    }
  };

  utils.forEachAM(function(module) {
    config[module.nameSpace] = {};
    var files = config[module.nameSpace].files = [];
    var tasks = config[module.nameSpace].tasks = [];

    if (module.hasHTML || module.hasJS || module.hasSCSS) {
      tasks.push('clean:' + module.nameSpace);
    }

    if (module.hasHTML) {
      files.push(module.src + '/**/*.html');
      tasks.push('html2js:' + module.nameSpace);
    }

    if (module.hasJS) {
      files.push(module.src + '/**/*.js');
      tasks.push('ngAnnotate:' + module.nameSpace);
      tasks.push('uglify:' + module.nameSpace);
    }

    if (module.hasSCSS) {
      files.push(module.src + '/**/*.scss');
      tasks.push('sass:' + module.nameSpace);
      tasks.push('autoprefixer:' + module.nameSpace);
      tasks.push('cssmin:' + module.nameSpace);
    }
  });

  return config;
})();
