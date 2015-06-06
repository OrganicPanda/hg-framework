angular.module('hg.core.utils', [
  'ui.router',

  'hg.core.styling'
])

  /**
   *
   */
  .service('utils', function($q, $http, $templateCache, $window, SASS) {

    /**
     *
     */
    this.getTemplate = function(url, html) {
      var deferred = $q.defer()
        , template = $templateCache.get(url);

      if (html || template) {
        deferred.resolve(html || template);
      } else {
        $http.get(url, { cache: true })
          .success(function(partial) {
            $templateCache.put(url, partial);
            deferred.resolve(partial);
          })
          .error(function() {
            deferred.reject();
          });
      }

      return deferred.promise;
    };

    /**
     *
     */
    this.forEachEl = function(selector, cb, el) {
      [].forEach.call((el || document).querySelectorAll(selector), cb);
    };

    /**
     *
     */
    this.screen = {
      isUnder: function(size) {
        return $window.innerWidth <= SASS['screen-' + size + '-min'];
      },
      isOver: function(size) {
        return $window.innerWidth >= (SASS['screen-' + size + '-min'] + 1);
      }
    };
  });
