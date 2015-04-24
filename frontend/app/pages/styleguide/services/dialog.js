angular.module('mis.pages.styleguide')

  .controller('MisStyleGuideDialogCtrl', function($scope, dialog) {
    $scope.launchDialog = function(size) {
      dialog.show({
        controller: 'MisDemoDialogCtrl',
        templateUrl: '/dist/pages/styleguide/services/dialog-example.html',
        title: 'Are you sure?',
        size: size,
        blackOut: true,
        closeClick: true
      }).then(function(response) {

      });
    };
  })

  .controller('MisDemoDialogCtrl', function($scope, $element, close) {
    $scope.cancel = function() {
      close(null);
    };

    $scope.delete = function() {
      close(true);
    };
  });
