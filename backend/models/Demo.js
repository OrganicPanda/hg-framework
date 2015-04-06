var mongoose = require('mongoose');
var pagination = require('../services/pagination');
var Schema = mongoose.Schema;

/*
 *
 */
var DemoSchema = new Schema({
  forename: { type: String },
  surname: { type: String },
  reg_group: { type: String },
  dob: { type: String },
  upn: { type: String }
}, {
  versionKey: false
});

DemoSchema.plugin(pagination);

var Demo = mongoose.model('Demo', DemoSchema);


/*
 *
 */
module.exports = Demo;
