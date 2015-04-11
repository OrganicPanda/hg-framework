angular.module( 'mis.components.charts')

  /**
   *
   */
  .factory('LineChart', function(MisChart) {

    function LineChart(config) {
      MisChart.call(this, config);

      this.chart.type = 'line';
    }

    LineChart.prototype = Object.create(MisChart.prototype);
    LineChart.prototype.constructor = LineChart;

    return LineChart;
  });
