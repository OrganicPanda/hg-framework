angular.module( 'mis.components.charts')

  /**
   *
   */
  .factory('DonutChart', function(MisChart) {

    function DonutChart(config) {
      MisChart.call(this, config);

      this.chart.type = 'pie';
    }

    DonutChart.prototype = Object.create(MisChart.prototype);
    DonutChart.prototype.constructor = DonutChart;

    return DonutChart;
  });
