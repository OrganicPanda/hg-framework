angular.module('mis.pages.styleguide')

  .controller('MisStyleGuideTableCtrl', function($scope, $filter, Demo, Table) {
    /**
     *
     */
    $scope.data = {};
    $scope.data.table = new Table({
      source: Demo.getList,
      options: {
        pagination: true,
        searching: true,
        sorting: true
      },
      structure: [
        { name: 'Surname', field: 'surname', sort: true },
        { name: 'Forename', field: 'forename' },
        { name: 'Reg Group', field: 'reg_group' },
        {
          name: 'DOB',
          field: 'dob',
          format: function(value) {
            return $filter('date')(value, 'shortDate');
          }
        },
        { name: 'UPN', field: 'upn' }
      ]
    });
  });
