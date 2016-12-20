var express = require('express');
var SpotifyWebApi = require('spotify-web-api-node');
var router = express.Router();
var pr = require('../bin/room-manager');

var spotifyApi = new SpotifyWebApi({
    clientId : 'a0ae2579f8c748b0afa1cb4ff3a46005',
    clientSecret : '01f2a3f7a5dc404fb6a4ea375c5057e2'
});


router.get('/', function (req, res, next) {
    res.render()
});

router.get('/search/:songName', function (req, res, next) {
    var term = req.params.songName;
    res.setHeader('Content-Type', 'application/json');
    console.log(term);

    spotifyApi.searchTracks(term).then(function(data){
        res.send(data.body);
    }, function(err){
        console.error(err);
    });
});

router.post('/queue', function(req, res, next){
    var room_key = req.body.room;
    var song = req.body.track;
    var room = pr.getRoom(room_key);

    room.enqueueSong(song);

    res.setHeader('Content-Type', 'application/json');

    res.send({response:'Song successfully added to queue'});
});



module.exports = router;


