var async = require('async');
var config = require('../config');

var DEFAULT = config.pagination.DEFAULT_RESULTS;
var MINIMUM = config.pagination.MIN_RESULTS;
var MAXIMUM = config.pagination.MAX_RESULTS;

/*
 * Attach to the schema
 */
function attatchPagination(schema) {
  schema.statics.paginate = paginate;
}

/*
 * The pagination function
 */
function paginate(req, query, options, cb) {
  // Normalise the params
  if (typeof query === 'function') {
    cb = query;
    query = {};
    options = {};
  } else if (typeof options === 'function') {
    cb = query;
    options = {};
  }

  // Get results and page number.
  var model = this;
  var page = parseInt(req.query.page, 10) || 1;
  var results = parseInt(req.query.results, 10) || DEFAULT;
  var sortColumn = req.query.sortColumn || null;
  var sortOrder = req.query.sortOrder || null;
  var sort = {};
  var skipFrom = (page * results) - results;
  var dbFind = model.find(query);

  page = page >= 1 ? page : 1;
  results = (results >= MINIMUM && results <= MAXIMUM) ? results : DEFAULT;

  if (options.columns) dbFind.select(options.columns);
  if (sortColumn) {
    sort[sortColumn] = sortOrder || 1;
    dbFind.sort(sort);
  }

  dbFind = dbFind
    .skip(skipFrom)
    .limit(results);

  async.parallel({
    results: function(callback) {
      dbFind.exec(callback);
    },
    count: function(callback) {
      model.count(query, callback);
    }
  }, function(err, data) {
    if (err) return cb(err);

    cb(err, {
      pageInfo: {
        page: page,
        count: data.results.length,
        totalResults: data.count,
        totalPages: Math.ceil(data.count / results)
      },
      items: data.results
    });
  });
}

/**
 * Export
 */
module.exports = attatchPagination;
