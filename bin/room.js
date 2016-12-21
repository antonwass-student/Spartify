var SpotifyWebApi = require('spotify-web-api-node');

var method = Room.prototype;

function Room(key, socket){
    this._key = key;
    this._socket = socket;
    this._spotifyApi = new SpotifyWebApi();
    this._playlist = [];
    this._counter = 0;


    this.initSocket();

    socket.emit('welcome','');
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

    });

    socket.on('song ended', function(){
        //var next_track = null;
        //socket.emit('play song', next);
    });
};

method.voteSong = function(id, voter){
    var playlist = this._playlist;
    console.log('VOTING SONG!');
    playlist.some(function(item){
        if(item.id == id){
            if(item.voters.indexOf(voter)<0){
                item.votes++;
                item.voters.push(voter);
                console.log('voted');
            }else{
                item.votes--;
                item.voters.splice(item.voters.indexOf(voter), 1);
                console.log('spliced');
            }

            playlist.sort(function(a,b){ var c = b.votes - a.votes; return c;});
            console.log('sorting');
            return true;
        }
    });
};

method.enqueueSong = function(song){
    var playlist = this._playlist;

    var trackObj = {
        id:this._counter++,
        song:song,
        votes:0,
        voters:[]
    };

    playlist.push(trackObj);

    playlist.sort(function(a,b){ var c = b.votes - a.votes; return c;});
};

method.getPlaylist = function(){
    return this._playlist;
}

method.getHost = function(){
    return this._socket;
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

