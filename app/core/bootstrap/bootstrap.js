require([

  'scribe',
  'scribe-plugin-sanitizer',
  'scribe-plugin-heading-command',
  'scribe-plugin-blockquote-command',
  'scribe-plugin-inline-styles-to-elements',
  'scribe-plugin-formatter-plain-text-convert-new-lines-to-html'

], function(

  Scribe,
  scribePluginSanitizer,
  scribePluginHeadingCommand,
  scribePluginBlockquoteCommand,
  scribePluginInlineStyles,
  scribePluginFormatterPlainTextConvertNewLinesToHtml

) {
  window.Scribe = Scribe;
  window.Scribe.plugins = {
    sanitizer: scribePluginSanitizer,
    inlineStyles: scribePluginInlineStyles,
    headingCommand: scribePluginHeadingCommand,
    blockquoteCommand: scribePluginBlockquoteCommand,
    newLinesToHTML: scribePluginFormatterPlainTextConvertNewLinesToHtml
  };

  angular.bootstrap(document, ['hg']);
});
