angular.module('hg.core.layout', [])

  /**
   *
   */
  .controller('HgLayoutCtrl', function($scope) {

    /**
     *
     */
    $scope.layoutState = {
      open: false
    };

    /**
     *
     */
    $scope.toggleLayout = function() {
      $scope.layoutState.open = !$scope.layoutState.open;
    };

    // We should close the sidebar if the page changes.
    $scope.$on('$stateChangeSuccess', function() {
      $scope.layoutState.open = false;
    });
  });
