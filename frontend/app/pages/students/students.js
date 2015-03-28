angular.module('mis.pages.students', [
  'ui.router',
  'mis.pages.students.tpl'
])

  .config(function($stateProvider) {
    $stateProvider
      .state('students', {
        url: '/students',
        templateUrl: '/dist/pages/students/students.html',
        data: {
          name: 'Students',
          icon: 'fa-child'
        }
      });
  });
