angular.module( 'mis.components.table', [
  'mis.components.table.tpl'
])

  /**
   * @ngdoc service
   * @name table.service:Table
   *
   * @requires $q
   * @requires cc
   *
   * @description
   *
   */
  .factory('Table', function($q, cc) {

    /*
     *
     */
    function Table(config) {
      this.source = config.source;
      this.options = config.options || {};
      this.structure = config.structure;

      this.pageInfo = {};
      this.sourceConf = {};

      this.data = {
        headers: [],
        rows: []
      };
    }

    /**
     *
     */
    Table.prototype.init = function() {
      if (this.options.pagination) this.setUpPagination();
      if (this.options.sortable) this.setUpSorting();

      this.buildTable();

      return this.getData();
    };

    /**
     *
     */
    Table.prototype.setUpPagination = function() {
      this.sourceConf.page = cc.PAGING_START;
      this.sourceConf.results = cc.PAGING_DEFAULT_RESULTS;
    };

    /**
     *
     */
    Table.prototype.setUpSorting = function() {
      this.sourceConf.sortOrder = cc.SORT_ASC;
      this.structure.some(function(column) {
        return this.sourceConf.sortColumn = column.sort ? column.field : null;
      }, this);
    };

    /**
     *
     */
    Table.prototype.buildTable = function() {
      this.data.headers =
        this.structure.map(function(cell) {
          return {
            field: cell.field,
            name: cell.name
          };
        });
    };

    /**
     *
     */
    Table.prototype.getData = function() {
      var that = this;
      var defer = $q.defer();

      if (angular.isFunction(this.source)) {
        this
          .source(this.sourceConf)
          .then(function(data) {
            that.data.rows = that.format(data);
            that.pageInfo = data.pageInfo;
            defer.resolve(that.data);
          });
      } else {
        that.data.rows = that.format(that.source);
        defer.resolve(that.data);
      }

      return defer.promise;
    };

    /**
     *
     */
    Table.prototype.format = function(data) {
      var that = this;

      function getRows() {
        return (data || []).map(function(row) {
          return {
            cells: getCells(row)
          };
        });
      }

      function getCells(row) {
        return that.structure.map(function(cell) {
          if (!cell.format) {
            return row[cell.field];
          } else {
            return cell.format(row[cell.field]);
          }
        });
      }

      return getRows();
    };


    return Table;

  })

  /**
   *
   */
  .directive('misTable', function() {
    return {
      templateUrl: '/dist/components/table/table.html',
      controller: 'MisTableCtrl',
      scope: {
        table: '=misTable'
      }
    };
  })

  /**
   *
   */
  .directive('misTablePagination', function() {
    return {
      replace: true,
      templateUrl: '/dist/components/table/pagination.html',
      controller: 'MisTablePaginationCtrl'
    };
  })

  /**
   *
   */
  .controller('MisTableCtrl', function($scope, cc) {

    function initTable(table) {
      if (!table) return;
      $scope.table = table;

      table
        .init()
        .then(function() {
          $scope.state.loading = false;
          tableInited();
        });
    }

    /**
     *
     */
    $scope.table = null;

    /**
     *
     */
    $scope.state = {
      loading: true,
      loadingPage: null
    };

    /**
     *
     */
    $scope.setSort = function(head) {
      if ($scope.table.sourceConf.sortColumn === head.field) {
        $scope.table.sourceConf.sortOrder =
          $scope.table.sourceConf.sortOrder === cc.SORT_ASC
            ? cc.SORT_DESC
            : cc.SORT_ASC;
      } else {
        $scope.table.sourceConf.sortColumn = head.field;
        $scope.table.sourceConf.sortOrder = cc.SORT_ASC;
      }

      $scope.table.getData();
    };

    /**
     *
     */
    var tableInited = $scope.$watch('table', initTable);
  })

  /**
   *
   */
  .controller('MisTablePaginationCtrl', function($scope) {
    var maxPageCount = 10;

    /**
     *
     */
    $scope.pageNumbers = function() {
      var numbers = [];
      var page = $scope.table.pageInfo.page;
      var totalPages = $scope.table.pageInfo.totalPages;
      var start = (Math.floor((page - 1) / maxPageCount) * maxPageCount) + 1;
      var end = totalPages < maxPageCount
        ? totalPages
        : start + (maxPageCount - 1);

      for (var i = start; i <= end; i++) {
        numbers.push(i);
      }

      return numbers;
    };

    /**
     *
     */
    $scope.pageOnNextSet = function() {
      return $scope.pageNumbers()[$scope.pageNumbers().length - 1] + 1;
    };

    /**
     *
     */
    $scope.updateResults = function() {
      $scope.table.sourceConf.page = 1;
      $scope.table.getData();
    };

    /**
     *
     */
    $scope.goToPage = function(n) {
      if ($scope.table.sourceConf.page === n) return;

      $scope.state.loadingPage = n;
      $scope.table.sourceConf.page = n;
      $scope.table.getData().then(function() {
        if ($scope.state.loadingPage === n) {
          $scope.state.loadingPage = null;
        }
      });
    };
  });
