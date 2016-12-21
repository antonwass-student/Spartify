var express = require('express');
var router = express.Router();
var pr = require('../bin/room-manager');

/* GET home page. */
router.get('/', function (req, res, next) {
   res.render('room', {title:'Room XXXX'})
});

router.get('/:roomId', function (req, res, next) {
    var key = req.params.roomId;

    console.log(key);

    var room = pr.getRoom(key);

    if(room !== null){
        res.render('room', {title:'Room ' + key});
    }else{
        res.redirect('/');
    }

});

module.exports = router;
