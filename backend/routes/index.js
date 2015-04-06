var express = require('express');
var router = express.Router();
// var passport = require('passport');
//

/**
 * Controllers
 */
var authCtrl = require('../controllers/auth');
var demoCtrl = require('../controllers/demo');

/**
 * Routes
 */
router.route('/demo')
  .get(authCtrl.check, demoCtrl.all);

module.exports = router;
