var SpotifyWebApi = require('spotify-web-api-node');

var method = Room.prototype;

function Room(client_io, key, socket, msg){
    this._client_io = client_io;
    this._key = key;
    this._socket = socket;
    this._spotifyApi = new SpotifyWebApi();
    this._playlist = [];
    this._currentSong = null;
    this._counter = 0;
    this._spotifyApi.setAccessToken(msg.access_token);


    socket.emit('room',JSON.stringify({key:key}));
    console.log('A new room was opened with key: ', key);

    this.initSocket(socket);
}

method.initSocket = function(socket){
    socket.on('song ended', ()=> this.playNextSong());
}

method.playNextSong = function(){
    var playlist = this._playlist;

    if(playlist.length>0){
        var currentSong = playlist[0];
        this._currentSong = currentSong;

        playlist.splice(0,1);

        this._socket.emit('play song', JSON.stringify({track:currentSong.song.uri}));

        this._client_io.emit('playlist updated');

    }else{
        this._currentSong = null;
    }
};

method.setHost = function(socket){
    this._socket = socket;
    method.initSocket(socket);
}

method.setAccessToken = function(token){
    this._spotifyApi.setAccessToken(token);
}

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
    var currentsong = this._currentSong;

    var trackObj = {
        id:this._counter++,
        song:song,
        votes:0,
        voters:[]
    };

    playlist.push(trackObj);

    playlist.sort(function(a,b){ var c = b.votes - a.votes; return c;});

    if(currentsong === null){
        this.playNextSong();
    }
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

