var Demo = require('../models/demo');
var responder = require('../services/responder');

/*
 * Export
 */
exports.all = allDemo;

/*
 *
 */
function allDemo(req, res) {
  Demo.paginate(req, function(err, data) {
    if (err) {
      responder.error(res, err);
    } else {
      responder.collection(res, data);
    }
  });
}
