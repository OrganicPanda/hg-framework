var conf = require('../conf')
  , path = require('path')
  , fs = require('fs');

/**
 *
 */
function isDir(pathCheck) {
  return fs.existsSync(pathCheck) && fs.statSync(pathCheck).isDirectory();
}

/**
 *
 */
function isFile(pathCheck) {
  return fs.existsSync(pathCheck) && fs.statSync(pathCheck).isFile();
}

/**
 *
 */
function isHidden(name) {
  return name[0] === '.';
}

/**
 *
 */
function forEachAM(cb, wd) {
  wd = wd || conf.locations.src;

  var cwd = process.cwd();
  var appsCwd = path.join(cwd, wd);
  var folders = fs.readdirSync(appsCwd);
  var data = {};

  folders.forEach(function(folder) {
    var folderCwd = path.join(appsCwd, folder);

    if (isHidden(folder) || isFile(folderCwd)) return;

    var modules = fs.readdirSync(folderCwd);
    data.folder = folder;

    modules.forEach(function(module) {
      var moduleCwd = path.join(folderCwd, module);

      if (isHidden(module) || isFile(moduleCwd)) return;

      data.name = module;
      data.nameSpace = folder + '-' + module;
      data.src = moduleCwd;
      data.dest = conf.locations.dest + '/' + folder + '/' + module;
      data.files = fs.readdirSync(moduleCwd);
      data.hasHTML = includesFileType(data.files, /.html$/);
      data.hasJS = includesFileType(data.files, /.js$/);
      data.hasSCSS = includesFileType(data.files, /.scss$/);

      cb(data);
    });
  });
}

/**
 *
 */
function includesFileType(files, match) {
  return !!files.filter(function(file) {
    return file.match(match);
  }).length;
}

module.exports = {
  isDir: isDir,
  isFile: isFile,
  isHidden: isHidden,
  forEachAM: forEachAM,
  includesFileType: includesFileType
};
