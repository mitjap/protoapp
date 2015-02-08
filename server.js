var express = require('express');
var errorHandler = require('errorhandler');
var path = require('path');
var socket = require('socket.io');
var routes = require('./routes');
var http = require('http');

//var cluster = require('cluster');

var app = express();
var server = http.createServer(app);
var io = socket.listen(server);

var ipAddress = address = server.address() && server.address().address || "localhost";

// all environments

//app.configure(function () {
	app.set('port', process.env.PORT || 80);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	//app.use(express.json());
//*/
app.use(express.static(path.join(__dirname, 'public')));

	//app.use(express.session({ secret: 'Top secret string. Hush hush!' }));

	// development only
	//if ('development' == app.get('env')) {
	//	app.use(express.logger());
	app.use(errorHandler());
	//}
//});

app.get('/', routes.index);


app.get('/partials/:name', function (req, res) {
	var name = req.params.name;
  res.render('partials/' + name);
});

io.on('connection', function(socket) {
	io.emit('chat message', '[' + ipAddress + '] a user connected');
	socket.on('disconnect', function() {
		io.emit('chat message', '[' + ipAddress + '] a user disconnected');
	});

	socket.on('chat message', function(msg){
		io.emit('chat message', '[' + ipAddress + '] ' + msg);
	});
});

server.listen(app.get('port'));
