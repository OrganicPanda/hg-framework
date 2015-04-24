angular.module('mis.components.dialog', [
  'mis.core.utils',
  'mis.components.dialog.tpl'
])

  /**
   *
   */
  .service('dialog'
      , function($document, $compile, $controller, $rootScope, $q, $timeout
        , SASS, utils) {

    /**
     *
     */
    this.show = function(config) {
      var deferred = $q.defer();

      if (!config.controller) {
        throw new Error('Dialog: Must provide a controller.')
      }

      /*
       *
       */
      function insertTemplate(tpl) {
        return utils
          .getTemplate('/dist/components/dialog/dialog.html')
          .then(function(dTpl) {
            return dTpl.replace('<template>', tpl);
          });
      }

      /*
       *
       */
      function createDialog(tpl) {
        var dialogScope = addScopeOptions($rootScope.$new());
        var dialogElement = $compile(angular.element(tpl))(dialogScope);

        $controller(config.controller, {
          $scope: dialogScope,
          $element: dialogElement,
          close: closeFn
        });

        function addScopeOptions(scope) {
          scope.config = config;
          scope.$$close = function() {
            if (config.closeClick) closeFn();
          };

          return scope;
        }

        function closeFn(result) {
          deferred.resolve(result);

          dialogElement.removeClass('dialog-open');
          dialogElement.addClass('dialog-close');

          $timeout(function() {
            dialogScope.$destroy();
            dialogElement.remove();
            deferred = null;
            dialogScope = null;
            dialogElement = null;
          }, SASS['transition-time-base']);
        }

        $document
          .find('body')
          .append(dialogElement);
      }

      /*
       *
       */
      utils
        .getTemplate(config.templateUrl, config.template)
        .then(insertTemplate)
        .then(createDialog);

      return deferred.promise;
    };
  });
