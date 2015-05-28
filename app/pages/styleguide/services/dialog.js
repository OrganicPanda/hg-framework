angular.module('hg.pages.styleguide')

  .controller('HgStyleGuideDialogCtrl', function($scope, Dialog) {
    $scope.launchDialog = function(size, backdrop) {
      new Dialog({
        controller: 'HgDemoDialogCtrl',
        templateUrl: '/dist/pages/styleguide/services/dialog-example.html',
        title: 'Are you sure?',
        size: size,
        blackOut: true,
        closeClick: backdrop
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
