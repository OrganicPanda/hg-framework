angular.module( 'ff.components.topbar', [
  'ff.components.topbar.tpl'
])

  /**
   *
   */
  .directive('ffTopbar', function() {
    return {
      replace: true,
      templateUrl: '/dist/components/topbar/topbar.html'
    };
  });
