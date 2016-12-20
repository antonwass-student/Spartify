var SpotifyWebApi = require('spotify-web-api-node');

var method = Room.prototype;

function Room(key, socket){
    this._key = key;
    this._socket = socket;
    this._spotifyApi = new SpotifyWebApi();
    this._playlist = [];


    //this.initSocket();

    //socket.emit('welcome','');
}

method.initSocket = function () {
    var socket = this._socket;
    var key = this._key;
    var spotifyApi = this._spotifyApi;

    socket.on('authenticate', function(data){
        console.log('received data: ' + data);

        var msg = JSON.parse(data);

        console.log('Authenticating client with token: ' + msg.access_token);

        this._access_token = msg.access_token;

        var response = {
            key : key
        };

        socket.emit('room',JSON.stringify(response));
        console.log(key);
        spotifyApi.setAccessToken(msg.access_token);

        var trackJson = {
            track: "spotify:track:0WE8YTl6GAVHnkfvMfci98"
        };
        var s = JSON.stringify(trackJson);
        console.log('Sending song: ' + s)
        socket.emit('play song', s);

    });
};

method.enqueueSong = function(song){
    var playlist = this._playlist;

    playlist.push(song);

}

method.getSpotifyApi = function(){
    return this._spotifyApi;
};


method.getKey = function(){
    return this._key;
};

method.getAccessToken = function(){
    return this._access_token;
};

method.close = function(){
    this._socket.end('Timed out');
};

module.exports = Room;

