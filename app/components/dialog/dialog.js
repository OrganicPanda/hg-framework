angular.module('hg.components.dialog', [
  'hg.core.utils',
  'hg.components.dialog.tpl'
])

  .factory('Dialog'
      , function($rootScope, $compile, $controller, $q, $timeout, SASS, utils) {

    /**
     *
     */
    function Dialog(config) {
      this.config = config;
      this.element = null;
      this.scope = null;
      this.deferred = $q.defer();

      if (!config.controller) {
        throw new Error('Dialog: Must provide a controller.');
      }

      this.build();

      return this.deferred.promise;
    }

    /**
     *
     */
    Dialog.prototype.build = function() {
      return $q.all({
        content: utils.getTemplate(this.config.templateUrl, this.config.template),
        wrapper: utils.getTemplate('/dist/components/dialog/dialog.html')
      }).then(function(tpls) {
        return tpls.wrapper.replace('<template>', tpls.content);
      }).then(function(tpl) {
        this.element = $compile(angular.element(tpl))(this.getScope())[0];

        $controller(this.config.controller, {
          $scope: this.getScope(),
          $element: this.element,
          close: this.close.bind(this)
        });

        this.insert();
      }.bind(this));
    };

    /**
     *
     */
    Dialog.prototype.getScope = function() {
      if (!this.scope) {
        this.scope = $rootScope.$new();
        this.scope.config = this.config;
        this.scope.$$close = this.config.closeClick
          ? this.close.bind(this)
          : angular.noop;
      }

      return this.scope;
    };

    /**
     *
     */
    Dialog.prototype.insert = function() {
      if (!document.body.contains(this.element)) {
        document.body.appendChild(this.element);
      }
    };

    /**
     *
     */
    Dialog.prototype.remove = function() {
      if (document.body.contains(this.element)) {
        document.body.removeChild(this.element);
      }
    };

    /**
     *
     */
    Dialog.prototype.close = function(result) {
      this.deferred.resolve(result);

      this.element.classList.remove('dialog-open');
      this.element.classList.add('dialog-close');

      $timeout(function() {
        this.remove();
        this.destroy();
      }.bind(this), SASS['transition-time-base']);
    };

    /**
     *
     */
    Dialog.prototype.destroy = function() {
      this.scope.$destroy();
    };

    return Dialog;
  });
