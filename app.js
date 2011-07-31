// lets include some modules
var http = require('http'), 
    io = require('socket.io'),
    fs = require('fs');

// for the sake of this example, lets have some html to serve up.
//var html = fs.readFileSync('socketio.html').toString();

// business as usual, create an http server.
var server = http.createServer(function (request, response) {
  // serve up the client page.
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end('Hello');
});

// listen on port
server.listen(80);

// attach socket.io to the server
var socket = io.listen(server);

// set up an event that handles connections that get made to the server.
// the callback for this event will supply the socket as a parameter.
socket.on('connection', function(client) {
  // on the socket we can attach events, lets respond to the client when
  // we recieve a message.
  client.on('message', function(message) {
    // we can log the message on the server side.
    console.log(message); 
    // then send it back to the client.
    client.send('Thanks for telling me "' + message + '"');
  });
});