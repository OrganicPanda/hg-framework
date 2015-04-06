angular.module('mis.pages.profile', [
  'ui.router',
  'mis.models.me',
  'mis.pages.profile.tpl'
])

  .config(function($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/me',
        templateUrl: '/dist/pages/profile/profile.html',
        data: {
          name: 'My Profile',
          icon: 'icon-user'
        }
      });
  })

  /*
   *
   */
  .directive('misMe', function(Me) {
    return {
      restrict: 'A',
      link: function(scope) {

        /*
         *
         */
        scope.profile = Me.data;

        /*
         *
         */
        scope.$watchCollection(function() {
          return Me.data;
        }, function(newMe, oldMe) {
          return (newMe === oldMe) || (scope.profile = newMe);
        });
      }
    };
  });
