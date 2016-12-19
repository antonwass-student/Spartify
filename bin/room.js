var SpotifyWebApi = require('spotify-web-api-node');
var net = require('net');

var method = Room.prototype;

function Room(key, socket){
    this._key = key;
    this._socket = socket;
    this._spotifyApi = new SpotifyWebApi();

    //initSocket();
}


function initSocket(){
    var socket = this._socket;
    socket.setEncoding('utf8');

    socket.on('data', function(data){
        console.log('received data: ' + data);

        var msg = JSON.parse(data);

        switch(msg.type){
            case 'authenticate':
                console.log('Authenticating client with token: ' + msg.access_token);

                this._access_token = msg.access_token;

                var response = {
                    type : 'room',
                    key : this._key
                };

                socket.write(JSON.stringify(response));

                this._spotifyApi.setAccessToken(this._access_token);

                break;

            case 'something':
                break;
            default:
                console.log('Could not interpret message', data);
                break;
        }
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

