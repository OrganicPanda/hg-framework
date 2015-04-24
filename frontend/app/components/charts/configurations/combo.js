angular.module( 'mis.components.charts')

  /**
   *
   */
  .factory('ComboChart', function(LineSeriesChart) {

    function ComboChart(config) {
      LineSeriesChart.call(this, config);
    }

    ComboChart.prototype = Object.create(LineSeriesChart.prototype);
    ComboChart.prototype.constructor = ComboChart;

    return ComboChart;
  });
