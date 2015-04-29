angular.module( 'hg.components.charts')

  /**
   *
   */
  .factory('LineSeriesChart', function(Chart) {

    function LineSeriesChart(config) {
      Chart.call(this, config);

      this.chart.type = 'area';
    }

    LineSeriesChart.prototype = Object.create(Chart.prototype);
    LineSeriesChart.prototype.constructor = LineSeriesChart;

    /**
     *
     */
    LineSeriesChart.prototype.configure = function() {
      // Set up the yAxis and allow for multiple axis
      if (this.config.yAxis) {
        if (angular.isArray(this.config.yAxis)) {
          this.yAxis = this.config.yAxis.map(function(yAxis, index) {
            return angular.extend(
              angular.copy(this.yAxis[index] || this.yAxis),
              yAxis);
          }, this);
        } else {
          angular.extend(this.yAxis, this.config.yAxis);
        }
      }

      // Set up the xAxis, only ever one of those.
      if (this.config.xAxis) {
        angular.extend(this.xAxis, this.config.xAxis);
      }

      // Doesn't make much sense to show a legend if only one data set.
      this.legend.enabled = this.rawSeries.length >= 2;
    };

    return LineSeriesChart;
  });
