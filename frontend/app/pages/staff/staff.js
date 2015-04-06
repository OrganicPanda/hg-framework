angular.module('mis.pages.staff', [
  'ui.router',
  'mis.pages.staff.tpl'
])

  .config(function($stateProvider) {
    $stateProvider
      .state('staff', {
        url: '/staff',
        templateUrl: '/dist/pages/staff/staff.html',
        data: {
          name: 'Staff',
          icon: 'icon-male'
        }
      });
  });
