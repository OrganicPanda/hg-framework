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
 * Build Regex query
 */
function buildQuery(query) {
  if (!query) return {};

  var model = this;
  var regexString = '^(' + query.replace(/ /g, '|') + ')';
  var search = new RegExp(regexString, 'ig');
  var find = { $or: [] };

  Object.keys(model.schema.paths)
    .forEach(function(key) {
      if (key === '_id') return;

      var thisQuery = {};
      thisQuery[key] = search;
      find.$or.push(thisQuery);
    });

  return find;
}

/*
 *
 */
function paginate(req, cb) {
  var model = this;

  // Paging and results
  var page = parseInt(req.query.page, 10) || 1;
  var results = parseInt(req.query.results, 10) || DEFAULT;

  page = page >= 1 ? page : 1;
  results = (results >= MINIMUM && results <= MAXIMUM) ? results : DEFAULT;

  // Query text search
  var query = buildQuery.call(model, req.query.query);

  // Sorting
  var sortOrder = req.query.sortOrder || 1;
  var sortColumn = req.query.sortColumn || null;
  var sort = {};

  if (sortColumn) sort[sortColumn] = sortOrder;

  /*
   * Query object.
   */
  var dbFind = model
      .find(query)
      .sort(sort)
      .skip((page * results) - results)
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
        count: data.results.length,
        from: ((page * results) - results) + 1,
        page: page,
        to: data.count < (page * results) ? data.count : (page * results),
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
