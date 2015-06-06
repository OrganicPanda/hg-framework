require.config({
  appDir: '',
  baseUrl: './vendor',
  paths: {
    'scribe': 'scribe/scribe',
    'scribe-plugin-sanitizer': 'scribe-plugin-sanitizer/scribe-plugin-sanitizer',
    'scribe-plugin-inline-styles-to-elements': 'scribe-plugin-inline-styles-to-elements/scribe-plugin-inline-styles-to-elements',
    'scribe-plugin-heading-command': 'scribe-plugin-heading-command/scribe-plugin-heading-command',
    'scribe-plugin-blockquote-command': 'scribe-plugin-blockquote-command/scribe-plugin-blockquote-command',
    'scribe-plugin-formatter-plain-text-convert-new-lines-to-html': 'scribe-plugin-formatter-plain-text-convert-new-lines-to-html/scribe-plugin-formatter-plain-text-convert-new-lines-to-html'
  }
});

angular.module('hg.core.config', [
  'ui.router',

  'hg.core.utils'
])

  /**
   *
   */
  .config(function($locationProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {

    // Enable HTML5 Mode
    // https://docs.angularjs.org/guide/$location
    $locationProvider.html5Mode(true);

    // Trailing slash in the URL optional
    $urlMatcherFactoryProvider.strictMode(false);

    // Redirect to 404 page if URL not found.
    $urlRouterProvider.otherwise('/');
  })

  /**
   *
   */
  .run(function($rootScope, $state, stateExt) {

    // Having $state on scope is very helpful.
    $rootScope.$state = $state;

    // States do have a relationship but the child and sibling
    // states are not accessible, so we add them here.
    $state.get().forEach(stateExt.addStateRelationships);
  });
