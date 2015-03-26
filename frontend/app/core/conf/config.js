angular.module('mis.core.config', [])

  /**
   *
   */
  .constant('config', {
    api: 'http://localhost:9000',
    store: {
      nameSpace: 'mis',
      token: 'token'
    },
    meStorageKey: 'me'
  });
