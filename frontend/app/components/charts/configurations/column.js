angular.module( 'mis.components.charts')

  /**
   *
   */
  .factory('ColumnChart', function(MisChart) {

    function ColumnChart(config) {
      MisChart.call(this, config);

      this.chart.type = 'column';
    }

    ColumnChart.prototype = Object.create(MisChart.prototype);
    ColumnChart.prototype.constructor = ColumnChart;

    return ColumnChart;
  });
