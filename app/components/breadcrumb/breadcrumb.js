angular.module( 'hg.components.breadcrumb', [
  'hg.components.breadcrumb.tpl'
])

  /**
   *
   */
  .directive('hgBreadcrumb', function() {
    return {
      templateUrl: '/dist/components/breadcrumb/breadcrumb.html',
      scope: {
        breadcrumb: '=hgBreadcrumb'
      }
    };
  });
