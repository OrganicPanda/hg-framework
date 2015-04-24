angular.module('mis.pages.styleguide')

  .controller('MisStyleGuideNotificationCtrl', function($scope, Notification) {
    $scope.notify = function(message, type) {
      new Notification({
        type: type,
        message: message
      });
    };
  });
