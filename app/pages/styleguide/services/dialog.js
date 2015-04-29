angular.module('hg.pages.styleguide')

  .controller('HgStyleGuideDialogCtrl', function($scope, dialog) {
    $scope.launchDialog = function(size, backdrop) {
      dialog.show({
        controller: 'HgDemoDialogCtrl',
        templateUrl: '/dist/pages/styleguide/services/dialog-example.html',
        title: 'Are you sure?',
        size: size,
        blackOut: true,
        closeClick: backdrop
      }).then(function(response) {

      });
    };
  })

  .controller('HgDemoDialogCtrl', function($scope, $element, close) {
    $scope.cancel = function() {
      close(null);
    };

    $scope.delete = function() {
      close(true);
    };
  });
