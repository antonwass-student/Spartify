var rooms = [];

var createRoom = function(){

    var key = createKey();

    var room = {
        key: key
    };

    rooms.push(room);

    return room;

};

var closeRoom = function(key){
    rooms.forEach(function(item, index){
        if(item.key === key){
            rooms.remove(item);
        }
    });
}


var getRoom = function(key){
    var result = null;
    rooms.forEach(function(item, index){
        if(item.key === key){
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
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = {
    createRoom: createRoom,
    closeRoom: closeRoom,
    getAllRooms: null,
    getRoom: getRoom

}

var newRoom = createRoom();

rooms.push(newRoom);
console.log("new room: " + newRoom.key);