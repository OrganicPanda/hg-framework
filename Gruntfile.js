module.exports = function(grunt) {
  var config = {};

  var defaultTasks = [
    'clean:all',
    'sharedVars',
    'html2js',
    'ngAnnotate',
    'uglify',
    'concat',
    'sass',
    'autoprefixer',
    'cssmin',
    'layout'
  ];

  var devTasks = [
    'default',
    'server',
    'watch'
  ];

  config.clean = require('./grunt/clean');
  config.html2js = require('./grunt/html2js');
  config.ngAnnotate = require('./grunt/ng-annotate');
  config.uglify = require('./grunt/uglify');
  config.concat = require('./grunt/concat');
  config.sass = require('./grunt/sass');
  config.autoprefixer = require('./grunt/autoprefixer');
  config.cssmin = require('./grunt/cssmin');
  config.watch = require('./grunt/watch');

  grunt.initConfig(config);

  grunt.registerTask('default', defaultTasks);
  grunt.registerTask('start', devTasks);
  grunt.registerTask('server', function() { require('./server.js'); });
  grunt.registerTask('sharedVars', require('./grunt/shared-vars')(grunt));
  grunt.registerTask('layout', require('./grunt/layout')(grunt));

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
