angular.module('mis.pages.styleguide', [
  'ui.router',

  'mis.models.demo',
  'mis.components.charts',
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
          name: 'Directives'
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

      .state('styleguide.directives.notification', {
        url: '/notification',
        templateUrl: '/dist/pages/styleguide/directives/notification.html',
        data: {
          name: 'Notification'
        }
      })

      .state('styleguide.directives.popup', {
        url: '/popup',
        templateUrl: '/dist/pages/styleguide/directives/popup.html',
        data: {
          name: 'Popup'
        }
      })

      .state('styleguide.directives.table', {
        url: '/table',
        templateUrl: '/dist/pages/styleguide/directives/table.html',
        data: {
          name: 'Table'
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
      , function($scope, $filter, $state, Demo, Table, AreaChart, BarChart
        , ColumnChart, ComboChart, DonutChart, LineChart, PieChart, Colors) {

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

    /**
     *
     */
    $scope.data = {};
    $scope.data.table = new Table({
      source: Demo.getList,
      options: {
        pagination: true,
        searching: true,
        sorting: true
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

    /**
     *
     */
    var lineSeries = {
      config: {},
      series: [
        {
          name: 'FooBar',
          data: [ 300, 550, 700, 400, 350, 200, 450, 500, 800, 850 ]
        }, {
          name: 'PingPong',
          data: [ 450, 600, 650, 300, 550, 600, 450, 800, 900, 950 ]
        }
      ]
    };

    var rangeSeries = {
      config: {},
      series: [
        {
          name: 'FooBar',
          y: 175
        }, {
          name: 'PingPong',
          y: 80
        }
      ]
    };

    var comboSeries = {
      config: {},
      series: [
        {
          name: 'PingPong',
          type: 'column',
          color: Colors['grey-light-base'],
          data: [ 450, 600, 650, 300, 550, 600, 450, 800, 900, 950 ]
        }, {
          name: 'FooBar',
          type: 'line',
          data: [ 300, 550, 700, 400, 350, 200, 450, 500, 800, 850 ]
        }, {
          name: 'FooBar',
          type: 'area',
          data: [ 200, 350, 500, 300, 250, 100, 250, 300, 500, 450 ]
        }
      ]
    };

    $scope.data.chart = {};
    $scope.data.chart.area = new AreaChart(lineSeries);
    $scope.data.chart.bar = new BarChart(lineSeries);
    $scope.data.chart.column = new ColumnChart(lineSeries);
    $scope.data.chart.donut = new DonutChart(rangeSeries);
    $scope.data.chart.line = new LineChart(lineSeries);
    $scope.data.chart.pie = new PieChart(rangeSeries);
    $scope.data.chart.combo = new ComboChart(comboSeries);
  });
