angular.module( 'mis.components.charts')

  /**
   *
   */
  .factory('ComboChart', function(MisChart) {

    function ComboChart(config) {
      MisChart.call(this, config);
    }

    ComboChart.prototype = Object.create(MisChart.prototype);
    ComboChart.prototype.constructor = ComboChart;

    return ComboChart;
  });
