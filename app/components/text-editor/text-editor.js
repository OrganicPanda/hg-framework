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
  .directive('hgTextEditor', function($document, $compile, TextEditor, utils) {
    return {
      require: 'ngModel',
      link: function(scope, el) {
        var textEditor = new TextEditor(el[0])
          , toolbar;

        /**
         *
         */
        scope.buttons = [
          {
            name: 'Bold',
            command: 'bold',
            active: false,
            disabled: false
          }, {
            name: 'Italic',
            command: 'italic',
            active: false,
            disabled: false
          }, {
            name: 'H1',
            command: 'h1',
            active: false,
            disabled: false
          }, {
            name: 'H2',
            command: 'h2',
            active: false,
            disabled: false
          }, {
            name: 'H3',
            command: 'h3',
            active: false,
            disabled: false
          }
        ];

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

            scope.$apply();
          }
        });

        //
        utils
        .getTemplate('/dist/components/text-editor/text-editor-toolbar.html')
        .then(function(tTpl) {
          toolbar = $compile(angular.element(tTpl))(scope);
          el[0].parentNode.appendChild(toolbar[0]);
        });
      }
    };
  });
