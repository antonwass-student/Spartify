var io = require('../bin/www');
var hio = io.of('/hosts');
var cio = io.of('/clients');

var RoomManager = require('../bin/room-manager');

console.log('Starting socket server for hosts');

hio.on('connection', function(socket){
    socket.emit('welcome', '');

    socket.on('new room', function(data){
        RoomManager.createRoom(socket, data);
    });

    socket.on('reconnect', function(data){
        console.log('Host reconnecting...');
        var msg = JSON.parse(data);

        RoomManager.reconnectHost(socket, msg.room_key, msg.access_token);

    });

    console.log('Host connected!');
});

console.log('Starting socket server for clients');

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

