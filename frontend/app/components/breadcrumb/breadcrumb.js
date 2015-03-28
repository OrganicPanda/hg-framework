angular.module( 'mis.components.breadcrumb', [
  'mis.components.breadcrumb.tpl'
])

  /**
   *
   */
  .directive('misBreadcrumb', function() {
    return {
      templateUrl: '/dist/components/breadcrumb/breadcrumb.html',
      scope: {
        breadcrumb: '=misBreadcrumb'
      }
    };
  });
