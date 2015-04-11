angular.module( 'mis.components.charts', [

])

  /**
   *
   */
  .factory('MisChart', function() {

    /**
     *
     */
    function MisChart(config) {
      this.config = config;

      this.chart = {
        height: 250
      };

      this.series = null;

      this.title = {
        text: ''
      };

      this.credits = {
        enabled: false
      };

      this.exporting = {
        enabled: false
      };
    }

    /**
     *
     */
    MisChart.prototype.build = function(element) {
      this.configure();
      this.setSeries();
      this.setRenderTo(element);

      this.highChart = new Highcharts.Chart(this);
    };

    /**
     *
     */
    MisChart.prototype.configure = function() {
      // Do something
    };

    /**
     *
     */
    MisChart.prototype.parseSeries = function() {
      return this.config.series;
    };

    /**
     *
     */
    MisChart.prototype.setSeries = function() {
      this.series = this.parseSeries();
    };

    /**
     *
     */
    MisChart.prototype.setRenderTo = function(element) {
      this.chart.renderTo = element;
    };

    /**
     *
     */
    MisChart.prototype.update = function() {
      this.configure();

      // Remove all series data
      while (this.highChart.series.length) {
        this.highChart.series[0].remove(false);
      }

      // Add new series data.
      this.parseSeries()
        .forEach(function(item) {
          this.highChart.addSeries(item, false);
        }, this);

      this.highChart.redraw();
    };

    return MisChart;
  })

  /**
   *
   */
  .directive('misChart', function() {
    return {
      template: '<div></div>',
      scope: {
        chart: '=misChart'
      },
      link: function(scope, el) {
        if (!scope.chart) return;

        // Build the chart
        scope.chart.build(el[0]);

        // Update the chart when the series data or config changes.
        scope.$watchCollection('chartData', function(newVal, oldVal) {
          if (!newVal || !oldVal || newVal === oldVal) return;

          scope.chart.update(newVal);
        });

        // Destroy the HighCharts instance when the chart scope dies.
        scope.$on('$destroy', function() {
          scope.chart.highChart.destroy();
        });
      }
    };
  });
