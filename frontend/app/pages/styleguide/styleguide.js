angular.module('mis.pages.styleguide', [
  'ipsum',
  'ui.router',

  'mis.core.styling',
  'mis.models.demo',
  'mis.components.charts',
  'mis.components.dialog',
  'mis.components.notification',
  'mis.components.table',
  'mis.pages.styleguide.tpl'
])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      /**
       *
       */
      .state('styleguide', {
        abstract: true,
        url: '/styleguide',
        templateUrl: '/dist/pages/styleguide/styleguide.html',
        controller: 'MisStyleguideCtrl',
        data: {
          name: 'Styleguide',
          icon: 'icon-paint-brush'
        }
      })

      /**
       *
       */
      .state('styleguide.core', {
        abstract: true,
        url: '/core',
        template: '<ui-view/>',
        data: {
          name: 'Core',
          icon: null
        }
      })

      .state('styleguide.core.colors', {
        url: '/colors',
        templateUrl: '/dist/pages/styleguide/core/colors.html',
        data: {
          name: 'Colors'
        }
      })

      .state('styleguide.core.grid', {
        url: '/grid',
        templateUrl: '/dist/pages/styleguide/core/grid.html',
        data: {
          name: 'Grid System'
        }
      })

      .state('styleguide.core.typography', {
        url: '/typography',
        templateUrl: '/dist/pages/styleguide/core/typography.html',
        data: {
          name: 'Typography'
        }
      })

      /**
       *
       */
      .state('styleguide.css', {
        abstract: true,
        url: '/css',
        template: '<ui-view/>',
        data: {
          name: 'CSS',
          icon: null
        }
      })

      .state('styleguide.css.alerts', {
        url: '/alerts',
        templateUrl: '/dist/pages/styleguide/css/alerts.html',
        data: {
          name: 'Alerts'
        }
      })

      .state('styleguide.css.buttons', {
        url: '/buttons',
        templateUrl: '/dist/pages/styleguide/css/buttons.html',
        data: {
          name: 'Buttons'
        }
      })

      .state('styleguide.css.cards', {
        url: '/cards',
        templateUrl: '/dist/pages/styleguide/css/cards.html',
        data: {
          name: 'Cards'
        }
      })

      .state('styleguide.css.form', {
        url: '/form',
        templateUrl: '/dist/pages/styleguide/css/form.html',
        data: {
          name: 'Forms'
        }
      })

      .state('styleguide.css.labels', {
        url: '/labels',
        templateUrl: '/dist/pages/styleguide/css/labels.html',
        data: {
          name: 'Labels'
        }
      })

      .state('styleguide.css.panel', {
        url: '/panel',
        templateUrl: '/dist/pages/styleguide/css/panel.html',
        data: {
          name: 'Panels'
        }
      })

      /**
       *
       */
      .state('styleguide.directives', {
        abstract: true,
        url: '/directives',
        template: '<ui-view/>',
        data: {
          name: 'Directives',
          icon: null
        }
      })

      .state('styleguide.directives.buttons', {
        url: '/buttons',
        templateUrl: '/dist/pages/styleguide/directives/buttons.html',
        data: {
          name: 'Buttons'
        }
      })

      .state('styleguide.directives.chart', {
        url: '/charts',
        controller: 'MisStyleGuideChartCtrl',
        templateUrl: '/dist/pages/styleguide/directives/chart.html',
        data: {
          name: 'Charts'
        }
      })

      .state('styleguide.directives.datePicker', {
        url: '/date-picker',
        templateUrl: '/dist/pages/styleguide/directives/date-picker.html',
        data: {
          name: 'Date Picker'
        }
      })

      .state('styleguide.directives.dropdown', {
        url: '/dropdown',
        templateUrl: '/dist/pages/styleguide/directives/dropdown.html',
        data: {
          name: 'Dropdown Menu'
        }
      })



      .state('styleguide.directives.table', {
        url: '/table',
        controller: 'MisStyleGuideTableCtrl',
        templateUrl: '/dist/pages/styleguide/directives/table.html',
        data: {
          name: 'Table'
        }
      })

      /**
       *
       */
      .state('styleguide.services', {
        abstract: true,
        url: '/services',
        template: '<ui-view/>',
        data: {
          name: 'Services',
          icon: null
        }
      })

      .state('styleguide.services.dialog', {
        url: '/dialog',
        controller: 'MisStyleGuideDialogCtrl',
        templateUrl: '/dist/pages/styleguide/services/dialog.html',
        data: {
          name: 'Dialog'
        }
      })

      .state('styleguide.services.notification', {
        url: '/notification',
        controller: 'MisStyleGuideNotificationCtrl',
        templateUrl: '/dist/pages/styleguide/services/notification.html',
        data: {
          name: 'Notification'
        }
      })

      .state('styleguide.services.progress', {
        url: '/progress',
        controller: 'MisStyleGuideProgressCtrl',
        templateUrl: '/dist/pages/styleguide/services/progress.html',
        data: {
          name: 'Progress'
        }
      });

      // Parent page redirections
      $urlRouterProvider.when(
        '/styleguide',
        '/styleguide/core');

      $urlRouterProvider.when(
        '/styleguide/core',
        '/styleguide/core/colors');

      $urlRouterProvider.when(
        '/styleguide/css',
        '/styleguide/css/alerts');

      $urlRouterProvider.when(
        '/styleguide/directives',
        '/styleguide/directives/buttons');
  })

  /**
   *
   */
  .controller('MisStyleguideCtrl'
      , function($scope, $state) {

    function fetchBreadcrumb() {
      return $state.$current.path.map(function(crumb) {
        return {
          name: crumb.data.name
        };
      });
    }

    $scope.state = {
      breadcrumb: fetchBreadcrumb()
    };

    $scope.$watch(function() {
      return $state.current;
    }, function(newVal, oldVal) {
      if (newVal === oldVal) return;

      $scope.state.breadcrumb = fetchBreadcrumb();
    });
  });
