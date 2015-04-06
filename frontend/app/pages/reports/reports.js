angular.module('mis.pages.reports', [
  'ui.router',
  'mis.pages.reports.tpl'
])

  .config(function($stateProvider) {
    $stateProvider
      .state('reports', {
        url: '/reports',
        templateUrl: '/dist/pages/reports/reports.html',
        data: {
          name: 'Reports',
          icon: 'icon-pie-chart'
        }
      });
  });
