angular.module( 'ff.components.sidebar', [
  'ui.router',
  'ff.core.constants',
  'ff.core.utils',
  'ff.components.sidebar.tpl',
  'ff.components.sticky'
])

  /**
   * @ngdoc directive
   * @name sideBar.directive:misSidebar
   *
   * @description
   * TODO:
   */
  .directive('ffSidebar', function($state, cc) {
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
            findParent(item.name)
              .children.push({
                state: item,
                children: []
              });
          }

          // Recursive look down for the parent route object.
          function findParent(name, structure, parent) {
            if (!structure) structure = name.split('.').slice(0, -1);

            if (structure.length) {
              parent = findParent(
                name,
                structure.slice(1, structure.length),
                (parent || menu).children.filter(function(child) {
                  return child.state.name.split('.').slice(-1)[0]
                    === structure[0];
                })[0]
              );
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
            return cc.MENU_ORDER.indexOf(a.state.name) -
              cc.MENU_ORDER.indexOf(b.state.name);
          });

          return menu;
        }

        /**
         *
         */
        scope.menu = getMenuItems({
          children: []
        });
      }
    };
  })

  /**
   *
   */
  .directive('ffSidebarMenu', function() {
    return {
      replace: true,
      templateUrl: '/dist/components/sidebar/sidebar-menu.html',
      scope: {
        items: '=ffSidebarMenu'
      }
    };
  })

  .directive('ffSidebarMenuItem', function($compile, $state, $window, utils) {
    return {
      replace: true,
      templateUrl: '/dist/components/sidebar/sidebar-menu-item.html',
      scope: {
        item: '=ffSidebarMenuItem'
      },
      link: function(scope, el) {

        /*
         * This is needed to get around Angular lack of ability
         * to do recursive directives straight from the template.
         */
        var menuTpl = '<div ff-sidebar-menu="item.children"></div>';
        if (scope.item.children.length) {
          $compile(menuTpl)(scope, function(cloned){
            el.append(cloned);
          });
        }

        scope.state = {
          open: false
        };

        /**
         *
         */
        scope.isActive = function() {
          return $state.includes(scope.item.state);
        };

        //
        scope.$watch(function() {
          return $state.current.name;
        }, function() {
          scope.state.open = scope.isActive() && utils.screen.isOver('md');
        });
      }
    };
  });
