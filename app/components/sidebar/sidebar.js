angular.module( 'hg.components.sidebar', [
  'ui.router',
  'hg.core.constants',
  'hg.core.utils',
  'hg.components.sidebar.tpl',
  'hg.components.sticky'
])

  /**
   *
   */
  .directive('hgSidebar', function() {
    return {
      replace: true,
      templateUrl: '/dist/components/sidebar/sidebar.html'
    };
  });
