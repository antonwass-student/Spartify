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
    var song_uri = req.body.track;

    var song_id = song_uri.substr(song_uri.lastIndexOf(':')+1,song_uri.length-1);

    spotifyApi.getTrack(song_id).then(function(result){
        pr.enqueueSong(room_key, result.body);
        console.log('Song queued');
    }, function(err){
        throw err;
    });


    pr.playSongInRoom(room_key, song_uri);
    console.log('song played');

    res.setHeader('Content-Type', 'application/json');

    res.send({response:'Song successfully added to queue'});
});

router.post('/vote', function(req, res, next){
    var room_key = req.body.room;
    var song_index = req.body.song_index;

    console.log(room_key, song_index);

    pr.voteSong(room_key, song_index, req.session.id);

    res.end();
});

router.get('/playlist/:room', function(req, res, next){
    var room_key = req.params.room;

    var playlist = pr.getRoom(room_key).getPlaylist();

    res.setHeader('Content-Type', 'application/json');

    res.send(JSON.stringify(playlist));
});



module.exports = router;


