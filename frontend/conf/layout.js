module.exports = {
  conf: {
    vendorScript: '<!-- MIS: scripts_vendor -->',
    vendorStylesheet: '<!-- MIS: stylesheets_vendor -->',
    appScript: '<!-- MIS: scripts_app -->',
    appStylesheet: '<!-- MIS: stylesheets_app -->'
  },
  vendor: [
    {
      name: 'angular',
      stylesheet: null,
      script: 'angular.min.js'
    }, {
      name: 'a0-angular-storage',
      stylesheet: null,
      script: 'dist/angular-storage.min.js'
    }, {
      name: 'angular-ui-router',
      stylesheet: null,
      script: 'release/angular-ui-router.min.js'
    }, {
      name: 'lodash',
      stylesheet: null,
      script: 'dist/lodash.underscore.min.js'
    }, {
      name: 'restangular',
      stylesheet: null,
      script: 'dist/restangular.min.js'
    }, {
      name: 'font-awesome',
      stylesheet: 'css/font-awesome.min.css',
      script: null
    }
  ]
};
