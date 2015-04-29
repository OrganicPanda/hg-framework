angular.module( 'ff.components.table', [
  'ff.components.table.tpl'
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
      if (this.options.sorting) this.setUpSorting();

      this.buildTable();

      return this.getData();
    };

    /**
     *
     */
    Table.prototype.setUpPagination = function() {
      this.sourceConf.page =
        this.options.pagination.start || cc.PAGING_START;
      this.sourceConf.results =
        this.options.pagination.results || cc.PAGING_DEFAULT_RESULTS;
    };

    /**
     *
     */
    Table.prototype.setUpSorting = function() {
      this.sourceConf.sortOrder = cc.SORT_ASC;
      this.structure.some(function(column) {
        return this.sourceConf.sortColumn = column.sort
          ? column.field
          : null;
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
          })
          .catch(function() {
            defer.reject();
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
            orig: row,
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
  .directive('ffTable', function(cc) {
    return {
      transclude: true,
      replace: true,
      templateUrl: '/dist/components/table/table.html',
      scope: {
        table: '=ffTable'
      },
      link: function(scope, el, attrs, ctrl, $transclude) {
        /**
         *
         */
        scope.state = {
          loading: true,
          loadingPage: null,
          customRowTpl: false
        };

        /**
         *
         */
        scope.setSort = function(head) {
          if (scope.table.sourceConf.sortColumn === head.field) {
            scope.table.sourceConf.sortOrder =
              scope.table.sourceConf.sortOrder === cc.SORT_ASC
                ? cc.SORT_DESC
                : cc.SORT_ASC;
          } else {
            scope.table.sourceConf.sortColumn = head.field;
            scope.table.sourceConf.sortOrder = cc.SORT_ASC;
          }

          scope.table.getData();
        };

        /**
         *
         */
        $transclude(function(clone) {
          if (!clone.length) return;
          scope.state.customRowTpl = clone;
        });

        /**
         *
         */
        scope.table
          .init()
          .catch(function() {
            scope.state.failed = true;
          })
          .finally(function() {
            scope.state.loading = false;
          });

      }
    };
  })

  /**
   *
   */
  .directive('ffTableActions', function() {
    return {
      replace: true,
      templateUrl: '/dist/components/table/actions.html',
      link: function(scope) {
        scope.$watch('table.sourceConf.query', function(newVal, oldVal) {
          if (newVal === oldVal) return;

          scope.table.sourceConf.page = 1;
          scope.table.getData();
        });
      }
    };
  })

  /**
   *
   */
  .directive('ffTablePagination', function() {
    return {
      replace: true,
      templateUrl: '/dist/components/table/pagination.html',
      link: function(scope) {
        var maxPages = 10;

        /**
         *
         */
        scope.pageNumbers = function() {
          var numbers = [];
          var page = scope.table.pageInfo.page;
          var totalPages = scope.table.pageInfo.totalPages;
          var start = (Math.floor((page - 1) / maxPages) * maxPages) + 1;
          var end = totalPages < maxPages
            ? totalPages
            : start + (maxPages - 1);

          for (var i = start; i <= end; i++) {
            numbers.push(i);
          }

          return numbers;
        };

        /**
         *
         */
        scope.pageOnNextSet = function() {
          return scope.pageNumbers()[scope.pageNumbers().length - 1] + 1;
        };

        /**
         *
         */
        scope.updateResults = function() {
          scope.table.sourceConf.page = 1;
          scope.table.getData();
        };

        /**
         *
         */
        scope.goToPage = function(n) {
          if (scope.table.sourceConf.page === n) return;

          scope.state.loadingPage = n;
          scope.table.sourceConf.page = n;
          scope.table.getData().then(function() {
            if (scope.state.loadingPage === n) {
              scope.state.loadingPage = null;
            }
          });
        };
      }
    };
  });
