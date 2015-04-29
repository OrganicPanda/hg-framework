angular.module( 'hg.components.charts')

  /**
   *
   */
  .factory('BarChart', function(LineSeriesChart) {

    function BarChart(config) {
      LineSeriesChart.call(this, config);

      this.chart.type = 'bar';
    }

    BarChart.prototype = Object.create(LineSeriesChart.prototype);
    BarChart.prototype.constructor = BarChart;

    return BarChart;
  });
