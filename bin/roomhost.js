var net = require('net');
var partyroom = require('../bin/partyroom');

var server = net.createServer(function(socket){

    socket.end('goodbye\n');

}).on('error', function(error){
    throw error;
});

server.on('connection', function(socket){
    socket.setEncoding('utf8');

    socket.on('data', function(data){
        console.log('received data: ' + data);

        var msg = JSON.parse(message);

        switch(msg.type){
            case 'authenticate':
                console.log('Authenticating client with token: ' + msg.access_token);

                var room = partyroom.createRoom();

                var response = {
                    type:'room',
                    key:room.key
                };

                socket.send(JSON.stringify(response));

                break;
        }
    });
});

server.listen(12345, function(){
    console.log('server opened on ', server.address());
});


