module.exports = {
  conf: {
    vendorScript: '<!-- #scripts_vendor# -->',
    vendorStylesheet: '<!-- #stylesheets_vendor# -->',
    appScript: '<!-- #scripts_app# -->',
    appStylesheet: '<!-- #stylesheets_app# -->'
  },
  vendor: {
    stylesheets: [
      'normalize.css/normalize.css'
    ],
    scripts: [
      'angular/angular.min.js',
      'angular-ui-router/release/angular-ui-router.min.js',
      'highcharts/adapters/standalone-framework.js',
      'highcharts/highcharts.js',
      'lodash/dist/lodash.underscore.min.js',
      'restangular/dist/restangular.min.js',
      'requirejs/require.js',
      'html-janitor/html-janitor.min.js'
    ]
  }
};
