var express = require('express');
var router = express.Router();
var pr = require('../bin/room-manager');


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Spartify', error: ''});

});

module.exports = router;
