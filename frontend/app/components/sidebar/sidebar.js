angular.module( 'mis.components.sidebar', [
  'ui.router',
  'mis.core.constants',
  'mis.components.sidebar.tpl'
])

  /**
   * @ngdoc directive
   * @name sideBar.directive:misSidebar
   *
   * @description
   * TODO:
   */
  .directive('misSidebar', function($state, cc) {
    return {
      replace: true,
      templateUrl: '/dist/components/sidebar/sidebar.html',
      link: function(scope) {

        /*
         * Traverses the UI-Routers state store and extracts
         * the registers routes as menu items.
         */
        function getMenuItems(menu) {

          // Only routes with names and not explicitly hidden from
          // side bar.
          function onlyValid(item) {
            return item.name && item.data && !item.data.hideInSidebar;
          }

          // Creates menu item with relative route from the parent.
          // All sub routes are stored as children with the
          function createMenuItem(item) {
            var structure = item.name.split('.')
              , length = structure.length
              , parent = extractParent(structure.slice(0, length - 1));

            parent.children.push({
              id: structure[structure.length - 1],
              nameSpace: structure,
              name: item.data.name,
              icon: item.data.icon,
              url: (parent.url || '') + item.url,
              abstract: item.abstract,
              children: []
            });
          }

          // Recursive lookup for the parent route object.
          function extractParent(structure, parent) {
            if (structure.length) {
              parent = extractParent(
                structure.slice(1, structure.length),
                (parent || menu).children.filter(function(child) {
                  return child.id === structure[0];
                })[0]);
            }

            return parent || menu;
          }

          // Kicks off the menu item creation.
          $state
            .get()
            .filter(onlyValid)
            .forEach(createMenuItem);

          // Each top-level route will have been given an order.
          menu.children.sort(function(a, b) {
            return cc.MENU_ORDER.indexOf(a.id) - cc.MENU_ORDER.indexOf(b.id);
          });

          return menu;
        }

        /**
         *
         */
        scope.menu = getMenuItems({
          children: []
        });

        /**
         *
         */
        scope.state = {
          active: {
            top: null,
            middle: null
          }
        };

        /**
         *
         */
        scope.toggle = function(level, item) {
          scope.state.active[level] =
            (scope.state.active[level] === item.id) || item.id;
        };

        //
        scope.$watch(function() {
          return $state.current;
        }, function(newVal, oldVal) {
          if (newVal === oldVal) return;

          var structure = newVal.name.split('.');

          scope.state.active.top = structure[0];
          scope.state.active.middle = structure[1];
        });
      }
    };
  });
