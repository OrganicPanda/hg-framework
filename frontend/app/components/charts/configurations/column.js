angular.module( 'mis.components.charts')

  /**
   *
   */
  .factory('ColumnChart', function(LineSeriesChart) {

    function ColumnChart(config) {
      LineSeriesChart.call(this, config);

      this.chart.type = 'column';
    }

    ColumnChart.prototype = Object.create(LineSeriesChart.prototype);
    ColumnChart.prototype.constructor = ColumnChart;

    return ColumnChart;
  });
