angular.module( 'mis.components.topbar', [
  'mis.components.topbar.tpl'
])

  /**
   *
   */
  .directive('misTopbar', function() {
    return {
      replace: true,
      templateUrl: '/dist/components/topbar/topbar.html'
    };
  });
