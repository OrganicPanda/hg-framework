angular.module( 'mis.components.charts', [
  'mis.core.styling'
])

  /**
   *
   */
  .factory('MisChart', function(SASS) {

    /**
     *
     */
    function MisChart(data) {
      this.config = data.config;
      this.rawSeries = data.series;

      this.chart = {
        height: 300,
        renderTo: null,
        events: {},
        plotBorderWidth: 0,
        plotShadow: false,
        plotBackgroundColor: null
      };

      // Default colours
      this.colors = [
        SASS['primary-pos1'],
        SASS['secondary-pos1']
      ];

      this.title = {
        text: ''
      };

      this.credits = {
        enabled: false
      };

      this.exporting = {
        enabled: false
      };

      this.plotOptions = {
        series: {
          borderWidth: 0,
          pointPadding: 0.01,
          fillOpacity: 0.2
        }
      };

      this.legend = {
        enabled: true
      };

      this.tooltip = {
        backgroundColor: null,
        borderWidth: null,
        shadow: null,
        style: {},
        useHTML: true
      };

      this.xAxis = {
        labels: {
          enabled: true
        },
        title: {
          text: null
        }
      };

      this.yAxis = {
        labels: {
          enabled: true
        },
        title: {
          text: null
        }
      };

      this.series = null;
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
      return this.rawSeries;
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
