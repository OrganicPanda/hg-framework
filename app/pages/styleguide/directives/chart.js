angular.module('hg.pages.styleguide')

  .controller('HgStyleGuideChartCtrl'
      , function($scope, $filter, AreaChart, BarChart, ColumnChart, ComboChart
        , DonutChart, LineChart, PieChart, SASS) {
    /**
     *
     */
    var lineSeries = {
      config: {
        yAxis: {
          labels: {
            formatter: function() {
              return $filter('currency')(this.value, '£');
            }
          }
        },
        xAxis: {
          categories: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
        }
      },
      series: [
        {
          name: 'FooBar',
          data: [ 300, 550, 700, 400, 350, 200, 450, 500, 800, 850 ]
        }, {
          name: 'PingPong',
          data: [ 450, 600, 650, 300, 550, 600, 450, 800, 900, 950 ]
        }
      ]
    };

    var rangeSeries = {
      config: {},
      series: [
        {
          name: 'FooBar',
          y: 175
        }, {
          name: 'PingPong',
          y: 80
        }
      ]
    };

    var comboSeries = {
      config: {
        xAxis: {
          categories: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
        },
        yAxis: [
          {
            title: {
              text: 'Money that means something'
            },
            opposite: true,
            labels: {
              formatter: function() {
                return $filter('currency')(this.value, '£');
              }
            }
          }, {
            title: {
              text: 'Something else describing money'
            },
            labels: {
              formatter: function() {
                return $filter('currency')(this.value, '£');
              }
            }
          }
        ]
      },
      series: [
        {
          name: 'PingPong',
          type: 'column',
          color: SASS['light-base'],
          data: [ 1450, 1600, 1650, 1300, 1550, 1600, 1450, 1800, 1900, 1950 ],
          yAxis: 0
        }, {
          name: 'FooBar',
          type: 'line',
          data: [ 300, 550, 700, 400, 350, 200, 450, 500, 800, 850 ],
          yAxis: 1
        }, {
          name: 'FooBar',
          type: 'area',
          data: [ 200, 350, 500, 300, 250, 100, 250, 300, 500, 450 ],
          yAxis: 1
        }
      ]
    };

    $scope.chart = {};
    $scope.chart.area = new AreaChart(lineSeries);
    $scope.chart.bar = new BarChart(lineSeries);
    $scope.chart.column = new ColumnChart(lineSeries);
    $scope.chart.donut = new DonutChart(rangeSeries);
    $scope.chart.line = new LineChart(lineSeries);
    $scope.chart.pie = new PieChart(rangeSeries);
    $scope.chart.combo = new ComboChart(comboSeries);
  });
