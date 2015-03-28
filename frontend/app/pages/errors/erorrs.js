angular.module('mis.pages.errors', [
  'ui.router',
  'mis.pages.errors.tpl'
])

  .config(function($stateProvider) {
    $stateProvider
      .state('404', {
        url: '/404',
        templateUrl: '/dist/pages/errors/404.html',
        data: {
          hideInSidebar: true
        }
      });
  });
