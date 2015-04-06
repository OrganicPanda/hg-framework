angular.module('mis.core.config', [
  'ui.router',
  'restangular'
])

  /**
   *
   */
  .constant('config', {
    api: 'http://localhost:9000',
    store: {
      nameSpace: 'mis',
      token: 'token'
    },
    meStorageKey: 'me'
  })

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
    $urlRouterProvider.otherwise('/404');

    // Restangular config
    RestangularProvider.addResponseInterceptor(function(data, operation) {
      var extractedData;

      if (operation === 'getList' && data.items) {
        extractedData = data.items;
        extractedData.pageInfo = data.pageInfo;
      } else {
        extractedData = data;
      }

      return extractedData;
    });
  });
