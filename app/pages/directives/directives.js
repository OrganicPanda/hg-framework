angular.module('hg.pages.directives', [
  'ui.router',

  'hg.core.styling',
  'hg.components.charts',
  'hg.components.table',
  'hg.pages.directives.tpl'
])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('directives', {
        abstract: true,
        url: '/directives',
        templateUrl: '/dist/pages/directives/directives.html',
        data: {
          name: 'Directives'
        }
      })

      .state('directives.chart', {
        url: '/charts',
        controller: 'HgStyleGuideChartCtrl',
        templateUrl: '/dist/pages/directives/chart.html',
        data: {
          name: 'Charts'
        }
      })

      .state('directives.table', {
        url: '/table',
        controller: 'HgStyleGuideTableCtrl',
        templateUrl: '/dist/pages/directives/table.html',
        data: {
          name: 'Table'
        }
      })

      .state('directives.textEditor', {
        url: '/text-editor',
        controller: 'HgStyleGuideTextEditorCtrl',
        templateUrl: '/dist/pages/directives/text-editor.html',
        data: {
          name: 'Text Editor'
        }
      });

    $urlRouterProvider.when(
      '/directives',
      '/directives/charts');

    });
