angular.module( 'ff.components.charts')

  /**
   *
   */
  .factory('RangeSeriesChart', function(Chart) {

    function RangeSeriesChart(config) {
      Chart.call(this, config);

      this.chart.type = 'area';
    }

    RangeSeriesChart.prototype = Object.create(Chart.prototype);
    RangeSeriesChart.prototype.constructor = RangeSeriesChart;

    RangeSeriesChart.prototype.parseSeries = function() {
      return [{ data: this.rawSeries }];
    };

    return RangeSeriesChart;
  });
