var conf = require('../conf');

module.exports = (function() {
  var config = {
    dist: {
      dest: conf.locations.dest + '/hg-framework.min.js',
      src: [
        conf.locations.dest + '/core/**/*.min.js',
        conf.locations.dest + '/components/**/*.min.js',
        conf.locations.dest + '/models/**/*.min.js',
        conf.locations.dest + '/pages/**/*.min.js'
      ]
    }
  };

  return config;
})();
