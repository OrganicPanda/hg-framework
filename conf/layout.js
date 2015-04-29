module.exports = {
  conf: {
    vendorScript: '<!-- #scripts_vendor# -->',
    vendorStylesheet: '<!-- #stylesheets_vendor# -->',
    appScript: '<!-- #scripts_app# -->',
    appStylesheet: '<!-- #stylesheets_app# -->'
  },
  vendor: [
    {
      name: 'angular',
      stylesheet: null,
      script: 'angular.min.js'
    }, {
      name: 'angular-ui-router',
      stylesheet: null,
      script: 'release/angular-ui-router.min.js'
    }, {
      name: 'highcharts',
      stylesheet: null,
      script: 'adapters/standalone-framework.js'
    }, {
      name: 'highcharts',
      stylesheet: null,
      script: 'highcharts.js'
    }, {
      name: 'normalize.css',
      stylesheet: 'normalize.css',
      script: null
    }, {
      name: 'angular-ipsum',
      stylesheet: null,
      script: 'dist/ipsum.min.js'
    }
  ]
};
