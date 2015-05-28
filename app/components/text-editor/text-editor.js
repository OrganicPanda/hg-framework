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
  .directive('hgTextEditor', function(SASS, TextEditor, TextEditorToolbar) {
    return {
      require: 'ngModel',
      link: function(scope, el, attr, ngModel) {
        var textEditor = new TextEditor(el[0])
          , toolbar = new TextEditorToolbar(textEditor, {
              yOffset: SASS['text-editor-tooltip']
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

        // Clean up when the scope is destroyed
        scope.$on('$destroy', function() {
          toolbar.destroy();
        });
      }
    };
  });
