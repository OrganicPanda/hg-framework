angular.module( 'hg.components.sidebar', [
  'ui.router',
  'hg.components.sidebar.tpl'
])

  /**
   *
   */
  .directive('hgSidebar', function() {
    return {
      replace: true,
      templateUrl: '/dist/components/sidebar/sidebar.html'
    };
  })

  /**
   *
   */
  .directive('hgSidebarMenu', function() {
    return {
      replace: true,
      templateUrl: '/dist/components/sidebar/menu.html',
      controller: 'HgSidebarMenuCtrl'
    };
  })

  /**
   *
   */
  .controller('HgSidebarMenuCtrl', function($scope, $state) {
    /**
     *
     */
    $scope.menu = null;

    /**
     *
     */
    $scope.levelUp = function() {
      $scope.menu = $scope.menu.data.parent;
    };

    /**
     *
     */
    $scope.levelDown = function(state) {
      $scope.menu = state.data.children[0];
    };


    //
    $scope.$watch(function() {
      return $state.current;
    }, function(newState, oldState) {
      if (newState !== oldState && newState.data && newState.data.siblings) {
        $scope.menu = newState;
      }
    });
  });
