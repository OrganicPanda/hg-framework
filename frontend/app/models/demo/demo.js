angular.module('mis.models.demo', [
  'restangular',
  'mis.components.api'
])

  /*
   *
   */
  .service('Demo', function($q, Restangular, API) {
    return API.all('demo');
  });
