var http = require('http'), 
    io = require('socket.io'),
    fs = require('fs'),
	router = require('choreographer').router();

var html = fs.readFileSync('views/home.html').toString();

// define routes
router.get('/', function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(html);
})
.get('/chat/*/', true, function(req, res, room) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Posted message to ' + room + '.\n');
})
.notFound(function(req, res) {
	res.writeHead(404, {'Content-Type': 'text/plain'});
	res.end('404: Page not found!\n');
});

// create server and listen
var server = http.createServer(router).listen(8080);

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