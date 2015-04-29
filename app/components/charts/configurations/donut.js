angular.module( 'hg.components.charts')

  /**
   *
   */
  .factory('DonutChart', function(PieChart) {

    function DonutChart(config) {
      PieChart.call(this, config);

      this.plotOptions.pie.center = ['50%', '50%'];
      this.plotOptions.pie.size = '100%';
      this.plotOptions.pie.innerSize = '70%';
    }

    DonutChart.prototype = Object.create(PieChart.prototype);
    DonutChart.prototype.constructor = DonutChart;

    return DonutChart;
  });
