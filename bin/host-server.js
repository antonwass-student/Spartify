var io = require('../bin/www');
var hio = io.of('/hosts');
var cio = io.of('/clients');

var RoomManager = require('../bin/room-manager');

console.log('Starting socket server');

hio.on('connection', function(socket){

    console.log('Host connected!');
    var room = RoomManager.createRoom(socket);

});


cio.on('connection', function(socket){

    console.log('Client connected!');

    socket.on('join', function(room){
        console.log('joining channel ' + room);

        socket.leave(room);
        socket.join(room);

        socket.emit('news', 'tjena');

        socket.on('disconnect', function(data){
            socket.leave(room);
            console.log('Client disconnected from room ' + room);
        });
    });

});

RoomManager.setClientChannel(cio);
RoomManager.setHostChannel(hio);

