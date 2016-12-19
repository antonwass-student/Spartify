var express = require('express');
var SpotifyWebApi = require('spotify-web-api-node');
var router = express.Router();

var spotifyApi = new SpotifyWebApi();


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

module.exports = router;


