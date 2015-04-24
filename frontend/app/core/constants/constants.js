angular.module('mis.core.constants', [])

  .constant('MENU_ORDER', [
    'dashboard',
    'profile',
    'contacts',
    'students',
    'staff',
    'communication',
    'reports',
    'styleguide'
  ])

  // Notification
  .constant('NOTIFY_DELAY', 2000)

  // Table
  .constant('PAGING_START', 1)
  .constant('PAGING_DEFAULT_RESULTS', 10)
  .constant('SORT_ASC', 1)
  .constant('SORT_DESC', -1)

  /**
   *
   */
  .service('cc', function() {
    var module = angular.module('mis.core.constants');

    module._invokeQueue.forEach(function(el) {
      if (el[1] === 'constant') {
        var name = el[2][0]
          , value = el[2][1];
        this[name] = value;
      }
    }, this);

    Object.freeze(this);
  });
