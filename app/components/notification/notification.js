angular.module('hg.components.notification', [
  'hg.core.constants',
  'hg.core.utils',
  'hg.components.notification.tpl'
])

  /**
   *
   */
  .factory('Notification'
      , function($rootScope, $compile, $document, $timeout, SASS, cc
        , utils, notificationRegistry) {

    /**
     *
     */
    function Notification(config) {
      this.config = config;
      this.element = null;
      this.scope = null;

      this
        .build()
        .then(this.insert.bind(this));
    }

    /**
     *
     */
    Notification.prototype.build = function() {
      return utils
        .getTemplate('/dist/components/notification/notification.html')
        .then(function(nTpl) {
          this.scope = $rootScope.$new();
          this.scope.config = this.config;
          this.scope.$$remove = this.remove.bind(this);

          this.element = $compile(angular.element(nTpl))(this.scope);
        }.bind(this));
    };

    /**
     *
     */
    Notification.prototype.insert = function() {
      $document
          .find('body')
          .append(this.element);

      this.element.addClass('notification-insert');
      notificationRegistry.add(this);

      if (!this.config.persist) {
        $timeout(function() {
          this.remove();
        }.bind(this), (this.config.delay || cc.NOTIFY_DELAY));
      }
    };

    /**
     *
     */
    Notification.prototype.remove = function() {
      this.element.removeClass('notification-insert');
      this.element.addClass('notification-remove');

      $timeout(function() {
        this.scope.$destroy();
        this.element.remove();
        notificationRegistry.remove(this);
      }.bind(this), SASS['transition-time-base']);
    };

    return Notification;
  })

  /**
   *
   */
  .service('notificationRegistry', function(SASS) {
    var registry = [];

    /**
     *
     */
    this.add = function(notification) {
      registry.push(notification);
      this.update();
    };

    /**
     *
     */
    this.remove = function(notification) {
      if (~registry.indexOf(notification)) {
        registry.splice(registry.indexOf(notification), 1);
        this.update();
      }
    };

    /**
     *
     */
    this.update = function() {
      var length = registry.length;

      function calcMargin(index) {
        return ((length - (index + 1)) *
          ((SASS['spacing-base'] * 3) + SASS['line-height'])) + 'px';
      }

      registry.forEach(function(notification, index) {
        notification.element.css({
          marginBottom: calcMargin(index)
        });
      });
    };
  });
