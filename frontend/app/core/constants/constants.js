angular.module('mis.core.constants', [])

  .constant('MENU_ORDER', [
    'dashboard',
    'profile',
    'contacts',
    'students',
    'staff',
    'reports',
    'styleguide'
  ])

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
