/**
 *
 */
angular.module('hg', [
  // Vendors
  'ngAnimate',
  'ui.router',

  // App modules
  'hg.core',
  'hg.models',
  'hg.components',
  'hg.pages'
]);

/**
 * Core sub-modules
 */
angular.module('hg.core', [
  'hg.core.config',
  'hg.core.constants',
  'hg.core.layout',
  'hg.core.styling',
  'hg.core.utils'
]);

/**
 * Models sub-modules
 */
angular.module('hg.models', [
  'hg.models.demo'
]);

/**
 * Components sub-modules
 */
angular.module('hg.components', [
  'hg.components.breadcrumb',
  'hg.components.charts',
  'hg.components.dialog',
  'hg.components.notification',
  'hg.components.sidebar',
  'hg.components.sticky',
  'hg.components.table',
  'hg.components.textEditor',
  'hg.components.topbar'
]);

/**
 * Pages sub-modules
 */
angular.module('hg.pages', [
  'hg.pages.core',
  'hg.pages.css',
  'hg.pages.directives',
  'hg.pages.landing',
  'hg.pages.services'
]);
