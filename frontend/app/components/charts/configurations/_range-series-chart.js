angular.module( 'mis.components.charts')

  /**
   *
   */
  .factory('RangeSeriesChart', function(MisChart) {

    function RangeSeriesChart(config) {
      MisChart.call(this, config);

      this.chart.type = 'area';
    }

    RangeSeriesChart.prototype = Object.create(MisChart.prototype);
    RangeSeriesChart.prototype.constructor = RangeSeriesChart;

    RangeSeriesChart.prototype.parseSeries = function() {
      return [{ data: this.rawSeries }];
    };

    return RangeSeriesChart;
  });
