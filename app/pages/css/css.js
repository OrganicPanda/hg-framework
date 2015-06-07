angular.module('hg.pages.css', [
  'ui.router',
  'hg.pages.css.tpl'
])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('css', {
        abstract: true,
        url: '/css',
        templateUrl: '/dist/pages/css/css.html',
        data: {
          index: 2,
          name: 'CSS'
        }
      })

      .state('css.alerts', {
        url: '/alerts',
        templateUrl: '/dist/pages/css/alerts.html',
        data: {
          name: 'Alerts'
        }
      })

      .state('css.buttons', {
        url: '/buttons',
        templateUrl: '/dist/pages/css/buttons.html',
        data: {
          name: 'Buttons'
        }
      })

      .state('css.cards', {
        url: '/cards',
        templateUrl: '/dist/pages/css/cards.html',
        data: {
          name: 'Cards'
        }
      })

      .state('css.form', {
        url: '/form',
        templateUrl: '/dist/pages/css/form.html',
        data: {
          name: 'Forms'
        }
      })

      .state('css.labels', {
        url: '/labels',
        templateUrl: '/dist/pages/css/labels.html',
        data: {
          name: 'Labels'
        }
      })

      .state('css.panel', {
        url: '/panel',
        templateUrl: '/dist/pages/css/panel.html',
        data: {
          name: 'Panels'
        }
      })

      .state('css.utility', {
        url: '/utility',
        templateUrl: '/dist/pages/css/utility.html',
        data: {
          name: 'Utility'
        }
      });

    $urlRouterProvider.when(
      '/css',
      '/css/alerts');
  });
