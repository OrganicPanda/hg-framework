angular.module( 'mis.components.charts')

  /**
   *
   */
  .factory('LineChart', function(LineSeriesChart) {

    function LineChart(config) {
      LineSeriesChart.call(this, config);

      this.chart.type = 'line';
    }

    LineChart.prototype = Object.create(LineSeriesChart.prototype);
    LineChart.prototype.constructor = LineChart;

    return LineChart;
  });
