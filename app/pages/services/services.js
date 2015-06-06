angular.module('hg.pages.services', [
  'ui.router',

  'hg.core.styling',
  'hg.components.dialog',
  'hg.components.notification',
  'hg.pages.services.tpl'
])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('services', {
        abstract: true,
        url: '/services',
        templateUrl: '/dist/pages/services/services.html',
        data: {
          index: 4,
          name: 'Services'
        }
      })

      .state('services.dialog', {
        url: '/dialog',
        controller: 'HgStyleGuideDialogCtrl',
        templateUrl: '/dist/pages/services/dialog.html',
        data: {
          name: 'Dialog'
        }
      })

      .state('services.notification', {
        url: '/notification',
        controller: 'HgStyleGuideNotificationCtrl',
        templateUrl: '/dist/pages/services/notification.html',
        data: {
          name: 'Notification'
        }
      });

    $urlRouterProvider.when(
      '/services',
      '/services/dialog');
  });
