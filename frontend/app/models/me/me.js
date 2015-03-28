angular.module('mis.models.me', [
  'restangular',
  'mis.components.api'
])

  /*
   *
   */
  .service('Me', function($q, Restangular, API) {
    var resource = API.one('me')
      , that = this;

    /*
     *
     */
    this.data = null;

    /*
     *
     */
    this.get = function() {
      return resource
        .get()
        .then(function(me) {
          return (that.data = Restangular.stripRestangular(me));
        });
    };
  });
