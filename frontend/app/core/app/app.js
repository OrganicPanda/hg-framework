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
  'mis.core.config',
  'mis.core.constants'
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
  'mis.components.auth',
  'mis.components.breadcrumb',
  'mis.components.sidebar',
  'mis.components.topbar'
]);

/**
 * Pages sub-modules
 */
angular.module('mis.pages', [
  'mis.pages.contacts',
  'mis.pages.dashboard',
  'mis.pages.errors',
  'mis.pages.profile',
  'mis.pages.reports',
  'mis.pages.staff',
  'mis.pages.students',
  'mis.pages.styleguide'
]);
