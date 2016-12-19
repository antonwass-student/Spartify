var net = require('net');
var io = require('../bin/www').io;

var RoomManager = require('../bin/room-manager');

io.on('connection', function(socket){
    var room = RoomManager.createRoom(socket);
    socket.on('authenticate', function(data){
        console.log('we received data!');
    });
});

