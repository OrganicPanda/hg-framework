angular.module('hg.components.textEditor', [
  'hg.components.textEditor.tpl'
])

  /**
   * @ngdoc service
   * @name textEditor.service:TextEditor
   *
   * @description
   *
   */
  .factory('TextEditor', function() {
    function TextEditor(element) {
      var scribe = new Scribe(element, {
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
   * @ngdoc directive
   * @name textEditor.directive:hgTextEditor
   *
   * @description
   *
   */
  .directive('hgTextEditor', function($compile, $timeout, SASS, TextEditor, utils) {
    return {
      scope: {
        config: '=hgTextEditor'
      },
      require: 'ngModel',
      link: function(scope, el, attr, ngModel) {
        var textEditor = new TextEditor(el[0])
          , toolbar
          , toolbarRect;

        /**
         * @doc property
         * @name execCommand
         * @propertyOf textEditor.directive:hgTextEditor
         *
         * @description
         * Available formatting buttons on the toolbar.
         */
        scope.buttons = [
          {
            icon: 'bold',
            command: 'bold'
          }, {
            icon: 'italic',
            command: 'italic'
          }, {
            name: 1,
            icon: 'header',
            command: 'h1'
          }, {
            name: 2,
            icon: 'header',
            command: 'h2'
          }, {
            name: 3,
            icon: 'header',
            command: 'h3'
          }
        ];

        /**
         * @doc method
         * @name execCommand
         * @methodOf textEditor.directive:hgTextEditor
         *
         * @description
         * Executes the formatting commands on the text editor.
         *
         * @param {String} command Name of the command to execute.
         * @param {String} value Optional value for the command.
         */
        scope.execCommand = function(command, value) {
          textEditor.el.focus();
          textEditor
            .getCommand(command)
            .execute(value);
        };


        // Set up the listeners to update the buttons depending on what
        // is selected.
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


        // Linking up the content
        scope.$watch(function() {
          return ngModel.$modelValue;
        }, function(newVal) {
          textEditor.setHTML(newVal);
        });

        textEditor.on('content-changed', function() {
          ngModel.$setViewValue(textEditor.getHTML());
          ngModel.$render();
        });


        // Build the toolbar
        // * First timeout: The width of the toolbar is altered by the icon
        //   if the icon font isn't loaded then we do not get a corrected width.
        //
        // * Second timeout: Need to wait for the element inserted into the DOM.
        $timeout(function() {
          utils
            .getTemplate('/dist/components/text-editor/text-editor-toolbar.html')
            .then(function(tTpl) {
              toolbar = $compile(angular.element(tTpl))(scope);

              document.body
                .querySelector(scope.config.toolbarLocation)
                .appendChild(toolbar[0]);

              $timeout(function() {
                toolbarRect = toolbar[0].getBoundingClientRect();
              });
            });
        });


        // Show the toolbar, visibility is handed by CSS.
        function showToolbar() {
          toolbar.addClass('toolbar-visible');
        }

        // Hide the toolbar.
        function hideToolbar() {
          toolbar.removeClass('toolbar-visible');
        }

        // Positions the toolbar over the current selection range.
        function repositionToolbar() {
          var selection = new textEditor.api.Selection()
            , rangeRect;

          if (!selection.range) return;

          rangeRect = selection.range.getBoundingClientRect();

          if (!selection.range.collapsed) {
            toolbar[0].style.top =
              rangeRect.top -
              toolbarRect.height -
              SASS['text-editor-tooltip'] + 'px';

            toolbar[0].style.left =
              rangeRect.left +
              (rangeRect.width / 2) -
              (toolbarRect.width / 2) + 'px';

            $timeout(showToolbar);
          } else {
            hideToolbar();
          }
        }


        // This is the main listener for handling the visibility of the
        // toolbar. For single clicks it will hide the toolbar, except when
        // it is a drag selection. Double clicks it will show and reposition
        // the toolbar
        var clicks = 0;
        textEditor.el.addEventListener('mouseup', function() {
          var selection = new textEditor.api.Selection();
          clicks++;

          if (clicks === 1) {
            $timeout(function(){
              if (clicks === 1) {
                if (selection.range.collapsed) {
                  hideToolbar();
                } else {
                  repositionToolbar();
                }
              } else {
                repositionToolbar();
              }

              clicks = 0;
            }, 300);
          }
        });


        // Anywhere else in the document that is not the edit area or the
        // toolbar, then hide the toolbar.
        document.addEventListener('mouseup', hideClick);
        function hideClick(event) {
          if (!utils.isChild([textEditor.el, toolbar[0]], event.target)) {
            hideToolbar();
          }
        }


        // Clean up when the scope is destroyed
        scope.$on('$destroy', function() {
          toolbar.remove();
          document.removeEventListener('mosueup', hideClick);
        });
      }
    };
  });
