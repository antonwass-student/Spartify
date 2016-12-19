var net = require('net');

var hosts = [];

var server = net.createServer(function(socket){

    socket.end('goodbye\n');

}).on('error', function(error){
    throw error;
});

server.on('connection', function(socket){
    socket.setEncoding('utf8');
    socket.on('data', function(data){
        console.log('received data: ' + data);
    });
});

server.listen(12345, function(){
    console.log('server opened on ', server.address());
});


function handleMessage(message){
    //parse to json
    //switch
}



