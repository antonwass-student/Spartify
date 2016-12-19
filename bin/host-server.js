var net = require('net');
var server = require('../bin/www').server;
var io = require('socket.io')(server);
var RoomManager = require('../bin/room-manager');

io.on('connection', function(socket){
    var room = RoomManager.createRoom(socket);
    socket.on('authenticate', function(data){
        console.log('we received data!');
    });
});

