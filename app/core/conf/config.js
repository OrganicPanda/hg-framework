angular.module('ff.core.config', [
  'ui.router'
])

  /**
   *
   */
  .config(function($locationProvider, $urlRouterProvider
      , $urlMatcherFactoryProvider) {

    // Enable HTML5 Mode
    // https://docs.angularjs.org/guide/$location
    $locationProvider.html5Mode(true);

    // Trailing slash in the URL optional
    $urlMatcherFactoryProvider.strictMode(false);

    // Redirect to 404 page if URL not found.
    $urlRouterProvider.when('/', '/styleguide');
    $urlRouterProvider.otherwise('/');
  })

  .run(function($rootScope, $state) {
    $rootScope.$state = $state;
  });
