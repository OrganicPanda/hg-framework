angular.module( 'mis.components.charts')

  /**
   *
   */
  .factory('AreaChart', function(MisChart) {

    function AreaChart(config) {
      MisChart.call(this, config);

      this.chart.type = 'area';
    }

    AreaChart.prototype = Object.create(MisChart.prototype);
    AreaChart.prototype.constructor = AreaChart;

    return AreaChart;
  });
