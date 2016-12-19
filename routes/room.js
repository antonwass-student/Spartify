var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:roomId', function (req, res, next) {
    var roomId = req.params.roomId;
    res.render('room', {title:'Room ' + roomId})
});

module.exports = router;
