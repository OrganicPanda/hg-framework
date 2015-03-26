var utils = require('./utils')
  , conf = require('../conf');

module.exports = (function() {
  var config = {
    options: {
      livereload: true
    }
  };

  utils.forEachModule(function(module) {
    config[module.nameSpace] = {};

    var files = config[module.nameSpace].files = [];
    var tasks = config[module.nameSpace].tasks = [];

    if (module.hasHTML || module.hasJS || module.hasSCSS) {
      tasks.push('clean:' + module.nameSpace);
    }

    if (module.hasHTML) {
      tasks.push('html2js:' + module.nameSpace);
      files.push(module.files.html.map(function(file) {
        return module.src + '/' + file;
      }));
    }

    if (module.hasJS) {
      tasks.push('ngAnnotate:' + module.nameSpace);
      tasks.push('uglify:' + module.nameSpace);
      files.push(module.files.js.map(function(file) {
        return module.src + '/' + file;
      }));
    }

    if (module.hasCSS) {
      tasks.push('sass:' + module.nameSpace);
      tasks.push('autoprefixer:' + module.nameSpace);
      tasks.push('cssmin:' + module.nameSpace);
      files.push(module.files.css.map(function(file) {
        return module.src + '/' + file;
      }));
    }
  });

  return config;
})();
