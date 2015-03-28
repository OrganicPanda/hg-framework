angular.module('mis.pages.dashboard', [
  'ui.router',
  'mis.pages.dashboard.tpl'
])

  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: '/dist/pages/dashboard/dashboard.html',
        data: {
          name: 'Dashboard',
          icon: 'fa-bar-chart'
        }
      });
  });
