angular.module( 'mis.components.charts')

  /**
   *
   */
  .factory('BarChart', function(MisChart) {

    function BarChart(config) {
      MisChart.call(this, config);

      this.chart.type = 'bar';
    }

    BarChart.prototype = Object.create(MisChart.prototype);
    BarChart.prototype.constructor = BarChart;

    return BarChart;
  });
