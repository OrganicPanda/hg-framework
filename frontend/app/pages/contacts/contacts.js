angular.module('mis.pages.contacts', [
  'ui.router',
  'mis.pages.contacts.tpl'
])

  .config(function($stateProvider) {
    $stateProvider
      .state('contacts', {
        url: '/contacts',
        templateUrl: '/dist/pages/contacts/contacts.html',
        data: {
          name: 'Contacts',
          icon: 'icon-book'
        }
      });
  });
