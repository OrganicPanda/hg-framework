angular.module('hg.components.textEditor')

  /**
   *
   */
  .factory('TextEditorToolbar'
      , function($compile, $timeout, $rootScope, utils) {
    var templateUrl = '/dist/components/text-editor/text-editor-toolbar.html';

    /**
     *
     */
    function Toolbar(editor, config) {
      this.editor = editor;
      this.element = null;
      this.scope = null;
      this.offset = null;

      this.config = angular.extend({
        yOffset: 0,
        xOffset: 0,
        buttons: [
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
        ]
      }, config);

      this.build();
    }

    /**
     *
     */
    Toolbar.prototype.build = function() {
      return utils
        .getTemplate(templateUrl)
        .then(function(partial) {
          this.element = $compile(angular.element(partial))(this.getScope())[0];
          this.insert();
          this.attachEventListeners();
        }.bind(this));
    };

    /**
     *
     */
     Toolbar.prototype.getScope = function() {
      if (!this.scope) {
        this.scope = $rootScope.$new();
        this.scope.buttons = this.config.buttons;
        this.scope.execCommand = this.execCommand.bind(this);
      }

      return this.scope;
     };


    /**
     *
     */
    Toolbar.prototype.insert = function() {
      if (!document.body.contains(this.element)) {
        document.body.appendChild(this.element);
      }
    };

    /**
     *
     */
    Toolbar.prototype.remove = function() {
      if (document.body.contains(this.element)) {
        document.body.removeChild(this.element);
      }
    };

    /**
     *
     */
    Toolbar.prototype.attachEventListeners = function() {
      window.addEventListener('resize', this.checkVisibilityAndPosition.bind(this));
      document.addEventListener('mouseup', this.checkVisibilityAndPosition.bind(this));
      this.editor.el.addEventListener('keyup', this.checkVisibilityAndPosition.bind(this));
    };

    /**
     *
     */
    Toolbar.prototype.removeEventListeners = function() {
      window.removeEventListener('resize', this.checkVisibilityAndPosition.bind(this));
      document.removeEventListener('mouseup', this.checkVisibilityAndPosition.bind(this));
      this.editor.el.removeEventListener('keyup', this.checkVisibilityAndPosition.bind(this));
    };

    /**
     *
     */
    Toolbar.prototype.execCommand = function(command, value) {
      this.editor.el.focus();
      this.editor
        .getCommand(command)
        .execute(value);
    };

    /**
     *
     */
    Toolbar.prototype.getValidSelection = function() {
      var selection = new this.editor.api.Selection();

      return selection &&
             selection.range &&
             !selection.range.collapsed &&
             this.editor.el.contains(selection.range.startContainer) &&
             this.editor.el.contains(selection.range.endContainer)
        ? selection
        : null;
    };

    /**
     *
     */
    Toolbar.prototype.getOffset = function() {
      if (!this.offset) {
        this.offset = this.element.getBoundingClientRect();
      }

      return this.offset;
    };

    /**
     *
     */
    Toolbar.prototype.checkVisibilityAndPosition = function() {
      $timeout(function() {
        var selection = this.getValidSelection();

        if (!selection || !selection.range || selection.range.collapsed) {
          this.hide();
        } else {
          this.checkButtonStates();
          this.reposition(selection.range);
          $timeout(this.show.bind(this));
        }
      }.bind(this));
    };

    /**
     *
     */
    Toolbar.prototype.checkButtonStates = function() {
      this.config.buttons.forEach(function(button) {
        var command = this.editor.getCommand(button.command);

        button.active = command.queryState(button.value);
        button.disabled = !command.queryEnabled();
      }, this);
    };

    /**
     *
     */
    Toolbar.prototype.show = function() {
      this.element.classList.add('toolbar-visible');
    };

    /**
     *
     */
    Toolbar.prototype.hide = function() {
      this.element.classList.remove('toolbar-visible');
    };

    /**
     *
     */
    Toolbar.prototype.reposition = function(range) {
      var rangeRect = range.getBoundingClientRect();
      var toolbarRect = this.getOffset();

      this.element.style.top =
        rangeRect.top -
        toolbarRect.height -
        this.config.yOffset +
        window.pageYOffset + 'px';

      this.element.style.left =
        rangeRect.left +
        (rangeRect.width / 2) -
        (toolbarRect.width / 2) -
        this.config.xOffset +
        window.pageXOffset + 'px';
    };

    /**
     *
     */
    Toolbar.prototype.destroy = function() {
      this.remove();
      this.removeEventListeners();
      this.scope.$destroy();
    };

    return Toolbar;
  });
