angular.module( 'mis.components.sidebar', [
  'ui.router',
  'mis.core.constants',
  'mis.components.sidebar.tpl'
])

  /**
   *
   */
  .directive('misSidebar', function($state, cc) {
    return {
      replace: true,
      templateUrl: '/dist/components/sidebar/sidebar.html',
      link: function(scope) {

        /**
         *
         */
        function getMenuItems(menu) {
          //
          function onlyValid(item) {
            return item.name && item.data && !item.data.hideInSidebar;
          }

          //
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

          //
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

          //
          $state
            .get()
            .filter(onlyValid)
            .forEach(createMenuItem);

          //
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
