angular.module( 'hg.components.charts')

  /**
   *
   */
  .factory('AreaChart', function(LineSeriesChart) {

    function AreaChart(config) {
      LineSeriesChart.call(this, config);

      this.chart.type = 'area';
    }

    AreaChart.prototype = Object.create(LineSeriesChart.prototype);
    AreaChart.prototype.constructor = AreaChart;

    return AreaChart;
  });
