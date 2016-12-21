var express = require('express');
var router = express.Router();
var pr = require('../bin/room-manager');

/* GET home page. */

/*tillfällig*/
router.get('/', function (req,res,next) {
   res.render('show',{title: 'ABC123'})
});

router.get('/:roomId', function (req, res, next) {
    var key = req.params.roomId;

    console.log(key);

    var room = pr.getRoom(key);

    if (room !== null) {
        res.render('show', {title: key});
    } else {
        res.redirect('/');
    }

});

module.exports = router;
