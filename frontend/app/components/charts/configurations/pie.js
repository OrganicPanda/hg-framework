angular.module( 'mis.components.charts')

  /**
   *
   */
  .factory('PieChart', function(MisChart) {

    function PieChart(config) {
      MisChart.call(this, config);

      this.chart.type = 'pie';
    }

    PieChart.prototype = Object.create(MisChart.prototype);
    PieChart.prototype.constructor = PieChart;

    return PieChart;
  });
