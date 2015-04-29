angular.module('ff.pages.styleguide')

  .controller('FFStyleGuideDialogCtrl', function($scope, dialog) {
    $scope.launchDialog = function(size, backdrop) {
      dialog.show({
        controller: 'FFDemoDialogCtrl',
        templateUrl: '/dist/pages/styleguide/services/dialog-example.html',
        title: 'Are you sure?',
        size: size,
        blackOut: true,
        closeClick: backdrop
      }).then(function(response) {

      });
    };
  })

  .controller('FFDemoDialogCtrl', function($scope, $element, close) {
    $scope.cancel = function() {
      close(null);
    };

    $scope.delete = function() {
      close(true);
    };
  });
