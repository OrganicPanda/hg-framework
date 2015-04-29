/**
 *
 */
angular.module('ff', [
  // Vendors
  'ipsum',
  'ui.router',

  // App modules
  'ff.core',
  'ff.models',
  'ff.components',
  'ff.pages'
]);

/**
 * Core sub-modules
 */
angular.module('ff.core', [
  'ff.core.config',
  'ff.core.constants',
  'ff.core.styling',
  'ff.core.utils'
]);

/**
 * Models sub-modules
 */
angular.module('ff.models', [
  'ff.models.demo'
]);

/**
 * Components sub-modules
 */
angular.module('ff.components', [
  'ff.components.breadcrumb',
  'ff.components.charts',
  'ff.components.dialog',
  'ff.components.notification',
  'ff.components.sidebar',
  'ff.components.sticky',
  'ff.components.table',
  'ff.components.topbar'
]);

/**
 * Pages sub-modules
 */
angular.module('ff.pages', [
  'ff.pages.styleguide'
]);
