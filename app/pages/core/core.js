angular.module('hg.pages.core', [
  'ui.router',

  'hg.pages.core.tpl'
])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('core', {
        abstract: true,
        url: '/core',
        templateUrl: '/dist/pages/core/core.html',
        data: {
          index: 1,
          name: 'Core'
        }
      })

      .state('core.colors', {
        url: '/colors',
        templateUrl: '/dist/pages/core/colors.html',
        data: {
          name: 'Colors'
        }
      })

      .state('core.grid', {
        url: '/grid',
        templateUrl: '/dist/pages/core/grid.html',
        data: {
          name: 'Grid System'
        }
      })

      .state('core.typography', {
        url: '/typography',
        templateUrl: '/dist/pages/core/typography.html',
        data: {
          name: 'Typography'
        }
      });

    $urlRouterProvider.when(
      '/core',
      '/core/colors');
  });

