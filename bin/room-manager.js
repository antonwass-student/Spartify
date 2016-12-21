var Room = require("../bin/room");
var io = null;
var cio = null;
var hio = null;

var rooms = [];

var voteSong = function(roomKey, index, voter){
    var room = getRoom(roomKey);

    room.voteSong(index, voter);

    cio.to(roomKey).emit('playlist updated');
}

var enqueueSong = function(roomKey, track){
    var room = getRoom(roomKey);

    room.enqueueSong(track);

    cio.to(roomKey).emit('playlist updated');
}

var playSongInRoom = function(roomKey, track){
    var room = getRoom(roomKey);

    var socket = room.getHost();
    socket.emit('play song', JSON.stringify({track:track}));
}

var setClientChannel = function(_cio){
    cio = _cio;
}
var setHostChannel = function(_hio){
    hio = _hio;
}


var createRoom = function(socket,callback){

    var key = createKey();

    var room = new Room(key, socket);

    rooms.push(room);

    setTimeout(function(){
        room.close();
    }, 43200000); //12 hours

    return room;

};

var closeRoom = function(key){
    rooms.forEach(function(item, index){
        if(item.getKey() === key){
            rooms.remove(item);
        }
    });
}


var getRoom = function(key){
    var result = null;
    rooms.forEach(function(item, index){
        if(item.getKey() === key){
            result = item;
            console.log('found item');
        }
    });

    return result;
}

function createKey(){
    var id = generateId();
    while(checkIfIdExist(id)){
        id = generateId();
    }
    return id;
}

function checkIfIdExist(id){
    var result = false;
    rooms.forEach(function(item, index){
        if(item.key === id){
            return result;
        }
    });

    return result;
}


function generateId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = {
    setClientChannel: setClientChannel,
    setHostChannel: setHostChannel,
    createRoom: createRoom,
    closeRoom: closeRoom,
    getAllRooms: null,
    getRoom: getRoom,
    playSongInRoom: playSongInRoom,
    enqueueSong:enqueueSong,
    voteSong:voteSong
}

/*
var newRoom = createRoom();

rooms.push(newRoom);
console.log("new room: " + newRoom.getKey());
*/