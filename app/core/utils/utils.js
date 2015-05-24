angular.module('hg.core.utils', [
  'hg.core.styling'
])

  /**
   *
   */
  .service('utils', function($q, $templateCache, $window, SASS) {

    /**
     *
     */
    this.getTemplate = function(url, html) {
      var deferred = $q.defer();

      deferred.resolve(html || $templateCache.get(url));

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
    this.isChild = function(parent, child) {
      function containCheck(aParent) {
        if (!aParent || !child) return false;

        var node = child.parentNode;

        while (node !== null) {
          if (node === aParent) return true;
          node = node.parentNode;
        }

        return false;
      }

      return angular.isArray(parent)
        ? parent.some(containCheck)
        : containCheck(parent);
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
