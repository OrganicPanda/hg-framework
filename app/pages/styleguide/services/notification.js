angular.module('hg.pages.styleguide')

  .controller('HgStyleGuideNotificationCtrl', function($scope, Notification) {
    $scope.notify = function(message, type, persist) {
      new Notification({
        type: type,
        message: message,
        persist: persist
      });
    };
  });
