angular.module( 'mis.components.charts')

  /**
   *
   */
  .factory('DonutChart', function(MisChart) {

    function DonutChart(config) {
      MisChart.call(this, config);

      this.chart.type = 'pie';

      this.plotOptions.pie = {
        dataLabels: {
          enabled: false
        },
        borderWidth: 0,
        center: ['50%', '50%'],
        size: '100%',
        innerSize: '70%',
        showInLegend: true
      };
    }

    DonutChart.prototype = Object.create(MisChart.prototype);
    DonutChart.prototype.constructor = DonutChart;

    DonutChart.prototype.parseSeries = function() {
      return [{ data: this.config.series }];
    };

    return DonutChart;
  });
