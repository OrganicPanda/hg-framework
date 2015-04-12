angular.module( 'mis.components.charts')

  /**
   *
   */
  .factory('PieChart', function(MisChart) {

    function PieChart(config) {
      MisChart.call(this, config);

      this.chart.type = 'pie';

      this.plotOptions.pie = {
        dataLabels: {
          enabled: false
        },
        borderWidth: 0,
        showInLegend: true
      };
    }

    PieChart.prototype = Object.create(MisChart.prototype);
    PieChart.prototype.constructor = PieChart;

    PieChart.prototype.parseSeries = function() {
      return [{ data: this.config.series }];
    };

    return PieChart;
  });
