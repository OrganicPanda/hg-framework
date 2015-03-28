angular.module('mis.pages.styleguide', [
  'ui.router',
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
          icon: 'fa-paint-brush'
        }
      })

      .state('styleguide.colors', {
        url: '/colors',
        templateUrl: '/dist/pages/styleguide/colors.html',
        data: {
          name: 'Colors'
        }
      })

      .state('styleguide.typography', {
        url: '/typography',
        templateUrl: '/dist/pages/styleguide/typography.html',
        data: {
          name: 'Typography'
        }
      })

      /**
       *
       */
      .state('styleguide.layout', {
        abstract: true,
        url: '/layout',
        template: '<ui-view/>',
        data: {
          name: 'Layout'
        }
      })

      .state('styleguide.layout.grid', {
        url: '/grid',
        templateUrl: '/dist/pages/styleguide/layout/grid.html',
        data: {
          name: 'Grid System'
        }
      })

      .state('styleguide.layout.panel', {
        url: '/panel',
        templateUrl: '/dist/pages/styleguide/layout/panel.html',
        data: {
          name: 'Panels'
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
  });
