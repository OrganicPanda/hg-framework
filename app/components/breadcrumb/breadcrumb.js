angular.module( 'hg.components.breadcrumb', [
  'ui.router',

  'hg.components.breadcrumb.tpl'
])

  /**
   *
   */
  .directive('hgBreadcrumb', function() {
    return {
      controller: 'HgBreadcrumbCtrl',
      templateUrl: '/dist/components/breadcrumb/breadcrumb.html',
      scope: {}
    };
  })

  /**
   *
   */
  .controller('HgBreadcrumbCtrl', function($scope, $state) {
    function fetchBreadcrumb() {
      return $state.$current.path.map(function(crumb) {
        return { name: crumb.data.name };
      });
    }

    $scope.breadcrumb = fetchBreadcrumb();

    $scope.$watch(function() {
      return $state.current;
    }, function(newVal, oldVal) {
      if (newVal === oldVal) return;

      $scope.breadcrumb = fetchBreadcrumb();
    });
  });
