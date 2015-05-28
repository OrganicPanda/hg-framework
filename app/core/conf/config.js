require.config({
  appDir: '',
  baseUrl: './vendor',
  paths: {
    'scribe': 'scribe/scribe',
    'scribe-plugin-sanitizer': 'scribe-plugin-sanitizer/scribe-plugin-sanitizer',
    'scribe-plugin-inline-styles-to-elements': 'scribe-plugin-inline-styles-to-elements/scribe-plugin-inline-styles-to-elements',
    'scribe-plugin-heading-command': 'scribe-plugin-heading-command/scribe-plugin-heading-command',
    'scribe-plugin-blockquote-command': 'scribe-plugin-blockquote-command/scribe-plugin-blockquote-command',
    'scribe-plugin-formatter-plain-text-convert-new-lines-to-html': 'scribe-plugin-formatter-plain-text-convert-new-lines-to-html/scribe-plugin-formatter-plain-text-convert-new-lines-to-html'
  }
});

angular.module('hg.core.config', [
  'ui.router',
  'restangular'
])

  /**
   *
   */
  .config(function($locationProvider, $urlRouterProvider
      , $urlMatcherFactoryProvider, RestangularProvider) {

    // Enable HTML5 Mode
    // https://docs.angularjs.org/guide/$location
    $locationProvider.html5Mode(true);

    // Trailing slash in the URL optional
    $urlMatcherFactoryProvider.strictMode(false);

    // Redirect to 404 page if URL not found.
    $urlRouterProvider.when('/', '/styleguide');
    $urlRouterProvider.otherwise('/');

    //
    // RestangularProvider.setBaseUrl('http://localhost:3000');
    // RestangularProvider.addResponseInterceptor(function(data, operation) {
    //   var extractedData;

    //   if (operation === 'getList' && data.items) {
    //     extractedData = data.items;
    //     extractedData.pageInfo = data.pageInfo;
    //   } else {
    //     extractedData = data;
    //   }

    //   return extractedData;
    // });
  })

  .run(function($rootScope, $state) {
    $rootScope.$state = $state;
  });
