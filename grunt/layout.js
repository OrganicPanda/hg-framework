var path = require('path')
  , utils = require('../lib/utils')
  , conf = require('../conf');

function vendorise(list) {
  return list.map(function(item) {
    return path.join(conf.locations.vendor, item);
  });
}

function createScript(src) {
  return '<script type="text/javascript" src="/' + src + '"></script>';
}

function createStylesheet(href) {
  return '<link rel="stylesheet" href="/' + href + '">';
}

module.exports = function(grunt) {
  return function() {
    var cwd = process.cwd();
    var templateSrc = path.join(cwd, conf.locations.layout.src);
    var templateDest = path.join(cwd, conf.locations.layout.dest);
    var templateContent = grunt.file.read(templateSrc);
    var appScripts = [];
    var appStylesheets = [];
    var vendorScripts = vendorise(conf.layout.vendor.scripts);
    var vendorStylesheets = vendorise(conf.layout.vendor.stylesheets);

    if (utils.arg('production')) {
      appScripts.push(conf.locations.dest + '/hg-framework.min.js');
      appStylesheets.push(conf.locations.dest + '/hg-framework.min.css');
    } else {
      utils.forEachModule(function(module) {
        var moduleScript
          , moduleScriptTpl
          , moduleStylesheet;

        if (utils.arg('nomin')) {
          moduleScript = module.name + '.js';
          moduleScriptTpl = module.name + '-tpl.js';
          moduleStylesheet = module.name + '.css';
        } else {
          moduleScript = module.name + '.min.js';
          moduleStylesheet = module.name + '.min.css';
        }

        if (~module.files.js.indexOf(moduleScript)) {
          appScripts.push(module.dest + '/' + moduleScript);
        }

        if (moduleScriptTpl && ~module.files.js.indexOf(moduleScriptTpl)) {
          appScripts.push(module.dest + '/' + moduleScriptTpl);
        }

        if (~module.files.css.indexOf(moduleStylesheet)) {
          appStylesheets.push(module.dest + '/' + moduleStylesheet);
        }
      }, conf.locations.dest);
    }

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
};
