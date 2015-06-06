angular.module('hg.pages.landing', [
  'ui.router',

  'hg.pages.landing.tpl'
])

  .config(function($stateProvider) {
    $stateProvider

      .state('landing', {
        url: '/',
        templateUrl: '/dist/pages/landing/landing.html',
        data: {
          index: 0,
          name: 'Introduction'
        }
      });
  });
