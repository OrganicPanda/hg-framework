angular.module( 'hg.components.topbar', [
  'hg.components.topbar.tpl'
])

  /**
   *
   */
  .directive('hgTopbar', function() {
    return {
      replace: true,
      templateUrl: '/dist/components/topbar/topbar.html'
    };
  });
