angular.module( 'hg.components.charts')

  /**
   *
   */
  .factory('PieChart', function(RangeSeriesChart) {

    function PieChart(config) {
      RangeSeriesChart.call(this, config);

      this.chart.type = 'pie';

      this.plotOptions.pie = {
        dataLabels: {
          enabled: false
        },
        borderWidth: 0,
        showInLegend: true,
        point: {
          events: {
            legendItemClick: function() {
              return false;
            }
          }
        }
      };
    }

    PieChart.prototype = Object.create(RangeSeriesChart.prototype);
    PieChart.prototype.constructor = PieChart;

    return PieChart;
  });
