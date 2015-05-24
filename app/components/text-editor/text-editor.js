angular.module('hg.components.textEditor', [
  'hg.components.textEditor.tpl'
])

  /**
   *
   */
  .factory('TextEditor', function() {
    function TextEditor(element) {
      var scribe = new Scribe.class(element, {
        allowBlockElements: true
      });

      scribe.use(Scribe.plugins.inlineStyles());
      scribe.use(Scribe.plugins.newLinesToHTML());
      scribe.use(Scribe.plugins.headingCommand(1));
      scribe.use(Scribe.plugins.headingCommand(2));
      scribe.use(Scribe.plugins.headingCommand(3));
      scribe.use(Scribe.plugins.blockquoteCommand());
      scribe.use(Scribe.plugins.sanitizer({
        tags: {
          h1: {},
          h2: {},
          h3: {},
          p: {},
          br: {},
          b: {},
          strong: {},
          i: {},
          strike: {},
          blockquote: {}
        }
      }));

      return scribe;
    }

    return TextEditor;
  })

  /**
   *
   */
  .directive('hgTextEditor', function($compile, $timeout, SASS, TextEditor, utils) {
    return {
      require: 'ngModel',
      link: function(scope, el) {
        var textEditor = new TextEditor(el[0])
          , toolbar
          , toolbarRect
          , hideTimeout;

        //
        utils
          .getTemplate('/dist/components/text-editor/text-editor-toolbar.html')
          .then(function(tTpl) {
            toolbar = $compile(angular.element(tTpl))(scope);
            document.body.querySelector('.layout-main').appendChild(toolbar[0]);
            $timeout(function() {
              toolbarRect = toolbar[0].getBoundingClientRect();
            });
          });

        /**
         *
         */
        scope.buttons = [
          {
            icon: 'bold',
            command: 'bold',
            active: false,
            disabled: false
          }, {
            icon: 'italic',
            command: 'italic',
            active: false,
            disabled: false
          }, {
            name: 1,
            icon: 'header',
            command: 'h1',
            active: false,
            disabled: false
          }, {
            name: 2,
            icon: 'header',
            command: 'h2',
            active: false,
            disabled: false
          }, {
            name: 3,
            icon: 'header',
            command: 'h3',
            active: false,
            disabled: false
          }
        ];

        /**
         *
         */
        scope.state = {
          visble: false
        };

        /**
         *
         */
        scope.execCommand = function(command, value) {
          textEditor.el.focus();
          textEditor
            .getCommand(command)
            .execute(value);
        };

        //
        scope.buttons.forEach(function(button) {
          textEditor.el.addEventListener('keyup', updateUi);
          textEditor.el.addEventListener('mouseup', updateUi);

          textEditor.el.addEventListener('focus', updateUi);
          textEditor.el.addEventListener('blur', updateUi);

          textEditor.on('content-changed', updateUi);

          function updateUi() {
            var command = textEditor.getCommand(button.command);
            var selection = new textEditor.api.Selection();

            button.active = selection.range && command.queryState(button.value);
            button.disabled = !(selection.range && command.queryEnabled());

            repositionToolbar();

            scope.$applyAsync();
          }
        });

        //
        function repositionToolbar() {
          var selection = new textEditor.api.Selection()
            , rangeRect
            , rangeMidPoint;

          if (!selection.range) return;

          rangeRect = selection.range.getBoundingClientRect();
          rangeMidPoint = rangeRect.left + (rangeRect.width / 2);

          if (!selection.range.collapsed) {
            toolbar[0].style.top = rangeRect.top - toolbarRect.height + 'px';
            toolbar[0].style.left = rangeMidPoint - (toolbarRect.width / 2) + 'px';

            $timeout(showToolbar);
          } else {
            hideToolbar();
          }
        }

        function showToolbar() {
          toolbar.addClass('toolbar-insert');
          toolbar.addClass('toolbar-visible');
        }

        function hideToolbar() {
          toolbar.removeClass('toolbar-insert');
          toolbar.removeClass('toolbar-visible');
        }

        //
        var clicks = 0;
        textEditor.el.addEventListener('mouseup', function() {
          var selection = new textEditor.api.Selection();

          clicks++;
          if (clicks === 1) {
            $timeout(function(){
              if (clicks === 1) {
                if (!selection.range.collapsed) {
                  repositionToolbar();
                } else {
                  hideToolbar();
                }
              } else {
                repositionToolbar();
              }
              clicks = 0;
            }, 300);
          }
        });

        //
        document.addEventListener('mouseup', function(event) {
          if (utils.isChild(textEditor.el, event.target) ||
              utils.isChild(toolbar[0], event.target)) {
            return false;
          }

          hideToolbar();
        });
      }
    };
  });
