var SpotifyWebApi = require('spotify-web-api-node');
//var net = require('net');
var io = require('socket.io');

var method = Room.prototype;

function Room(key, socket){
    this._key = key;
    this._socket = socket;
    this._spotifyApi = new SpotifyWebApi();



    initSocket.call(this);
    socket.emit('welcome','');
}


function initSocket(){
    var socket = this._socket;
    socket.on('authenticate', function(data){
        console.log('received data: ' + data);

        var msg = JSON.parse(data);

        console.log('Authenticating client with token: ' + msg.access_token);

        this._access_token = msg.access_token;

        var response = {
            key : this._key
        };

        socket.emit('room',JSON.stringify(response));
        console.log(this._key);
        this._spotifyApi.setAccessToken(this._access_token);

    });

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

