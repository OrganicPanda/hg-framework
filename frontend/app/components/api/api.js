angular.module('mis.components.api', [
  'restangular',
  'mis.core.config'
])

  /**
   *
   */
  .factory('API', function(Restangular, config) {
     return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(config.api);
      });
  });
