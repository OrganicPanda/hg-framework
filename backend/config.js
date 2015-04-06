var config = {};

/*
 *
 */
config.server = {
  protocol: 'http',
  host: 'localhost',
  port: process.env.PORT || 9000,
  address: function(path) {
    return this.protocol + '://' +
           this.host + ':' +
           this.port + '/' +
           path;
  }
};

/*
 *
 */
config.mongo = {
  protocol: 'mongodb',
  host: 'localhost',
  port: 27017,
  db: 'mis',
  address: function() {
    return this.protocol + '://' +
           this.host + ':' +
           this.port + '/' +
           this.db;
  }
};

/**
 *
 */
config.pagination = {
  DEFAULT_RESULTS: 10,
  MIN_RESULTS: 10,
  MAX_RESULTS: 100
};

/*
 *
 */
config.jwt = {
  secret: 'foo'
};

module.exports = config;
