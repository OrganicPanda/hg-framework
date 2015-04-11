var utils = require('./utils')
  , conf = require('../conf');

function parseColors(content) {
  var colors = {};

  content
    .split(/\n/g)
    .forEach(function(item) {
      item = item.match(/\$(.*):\s*(#.*);/);

      if (!item || !item[1] || !item[2]) return;

      colors[item[1]] = item[2];
    });

  return colors;
}

module.exports = function(grunt) {
  var src = utils.location(conf.locations.colors.src);
  var dest = utils.location(conf.locations.colors.dest);
  var colorData = parseColors(grunt.file.read(src));

  grunt.file.write(dest,
    grunt.file.read(dest)
      .replace(/\{.*(\n.*)*.*\}/, JSON.stringify(colorData, null, '    '))
      .replace(/"/g, '\'')
      .replace('}', '  }'));
};
