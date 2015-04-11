var path = require('path')
  , utils = require('./utils')
  , conf = require('../conf');

function vendor(type) {
  return conf.layout.vendor
    .filter(function(item) { return item[type]; })
    .map(function(item) {
      return conf.locations[conf.locations.vendor] +
        '/' + item.name + '/' + item[type];
    });
}

function createScript(src) {
  return '<script type="text/javascript" src="/' + src + '"></script>';
}

function createStylesheet(href) {
  return '<link rel="stylesheet" href="/' + href + '">';
}

module.exports = function(grunt) {
  var cwd = process.cwd();
  var templateSrc = path.join(cwd, conf.locations.layout.src);
  var templateDest = path.join(cwd, conf.locations.layout.dest);
  var templateContent = grunt.file.read(templateSrc);
  var appScripts = [];
  var appStylesheets = [];
  var vendorScripts = vendor('script');
  var vendorStylesheets = vendor('stylesheet');

  utils.forEachModule(function(module) {
    var moduleScript = module.name + '.min.js';
    var moduleStylesheet = module.name + '.min.css';

    if (~module.files.js.indexOf(moduleScript)) {
      appScripts.push(module.dest + '/' + moduleScript);
    }

    if (~module.files.css.indexOf(moduleStylesheet)) {
      appStylesheets.push(module.dest + '/' + moduleStylesheet);
    }
  }, conf.locations.dest);

  appScripts = appScripts.map(createScript).join('\n');
  appStylesheets = appStylesheets.map(createStylesheet).join('\n');
  vendorScripts = vendorScripts.map(createScript).join('\n');
  vendorStylesheets = vendorStylesheets.map(createStylesheet).join('\n');

  templateContent = templateContent
    .replace(conf.layout.conf.vendorScript, vendorScripts)
    .replace(conf.layout.conf.vendorStylesheet, vendorStylesheets)
    .replace(conf.layout.conf.appScript, appScripts)
    .replace(conf.layout.conf.appStylesheet, appStylesheets);

  grunt.file.write(templateDest, templateContent);
};
