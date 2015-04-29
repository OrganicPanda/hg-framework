angular.module( 'ff.components.breadcrumb', [
  'ff.components.breadcrumb.tpl'
])

  /**
   *
   */
  .directive('ffBreadcrumb', function() {
    return {
      templateUrl: '/dist/components/breadcrumb/breadcrumb.html',
      scope: {
        breadcrumb: '=ffBreadcrumb'
      }
    };
  });
