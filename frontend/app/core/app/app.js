/**
 *
 */
angular.module('mis', [
  // Vendors
  'angular-storage',
  'restangular',
  'ui.router',

  // App modules
  'mis.core',
  'mis.models',
  'mis.components',
  'mis.pages'
]);

/**
 * Core sub-modules
 */
angular.module('mis.core', [
  'mis.core.config'
]);

/**
 * Models sub-modules
 */
angular.module('mis.models', [
  'mis.models.me'
]);

/**
 * Models sub-modules
 */
angular.module('mis.components', [
  'mis.components.api',
  'mis.components.auth'
]);

/**
 * Pages sub-modules
 */
angular.module('mis.pages', [

]);
