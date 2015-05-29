angular.module('hg.pages.directives')

  .controller('HgStyleGuideTableCtrl', function($scope, $filter, Demo, Table) {
    /**
     *
     */
    $scope.data = {};
    $scope.data.table = new Table({
      source: 'data/table.json',
      options: {
        pagination: {
          enabled: false
        },
        searching: false,
        sorting: false
      },
      structure: [
        { name: 'Surname', field: 'surname', sort: true },
        { name: 'Forename', field: 'forename' },
        {
          name: 'DOB',
          field: 'dob',
          format: function(value) {
            return $filter('date')(value, 'shortDate');
          }
        },
        { name: 'UID', field: 'uid' }
      ]
    });
  });
