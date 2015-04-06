angular.module('mis.pages.styleguide', [
  'ui.router',

  'mis.models.demo',
  'mis.components.table',
  'mis.pages.styleguide.tpl'
])

  .config(function($stateProvider) {
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
          name: 'Core'
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
          name: 'CSS'
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
          name: 'Directives'
        }
      })

      .state('styleguide.directives.chart', {
        url: '/chart',
        templateUrl: '/dist/pages/styleguide/directives/chart.html',
        data: {
          name: 'Chart'
        }
      })

      .state('styleguide.directives.table', {
        url: '/table',
        templateUrl: '/dist/pages/styleguide/directives/table.html',
        data: {
          name: 'Table'
        }
      });
  })

  /**
   *
   */
  .controller('MisStyleguideCtrl', function($scope, $state) {
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
  })

  /**
   *
   */
  .directive('misDemoData', function($filter, Table, Demo) {
    return {
      link: function(scope) {

        /**
         *
         */
        scope.table = new Table({
          source: Demo.getList,
          options: {
            pagination: true,
            sortable: true
          },
          structure: [
            { name: 'Surname', field: 'surname', sort: true },
            { name: 'Forename', field: 'forename' },
            { name: 'Reg Group', field: 'reg_group' },
            {
              name: 'DOB',
              field: 'dob',
              format: function(value) {
                return $filter('date')(value, 'shortDate');
              }
            },
            { name: 'UPN', field: 'upn' }
          ]
        });
      }
    };
  });
