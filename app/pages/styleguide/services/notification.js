angular.module('ff.pages.styleguide')

  .controller('FFStyleGuideNotificationCtrl', function($scope, Notification) {
    $scope.notify = function(message, type, persist) {
      new Notification({
        type: type,
        message: message,
        persist: persist
      });
    };
  });
