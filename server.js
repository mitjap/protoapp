var express = require('express');
var errorHandler = require('errorhandler');
var path = require('path');
var socket = require('socket.io');
var socket_redis = require('socket.io-redis');
var redis = require('redis');
var routes = require('./routes');
var http = require('http');
var os = require('os');

//var cluster = require('cluster');

var app = express();
var server = http.createServer(app);
var io = socket.listen(server);
io.adapter(socket_redis({ host: 'redis-cluster.qaonoo.0001.euc1.cache.amazonaws.com', port: 6379 }));

var redisClient = redis.createClient(6379, 'redis-cluster.qaonoo.0001.euc1.cache.amazonaws.com');

redisClient.on("connect", function () {
	redisClient.set("foo_key", "some fantastic value", redis.print);
	redisClient.get("foo_key", redis.print);
});



var hostname = os.hostname();

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

io.on('connection', function(s) {
	io.emit('chat message', '[' + hostname + '] a user connected');
	s.on('disconnect', function() {
		io.emit('chat message', '[' + hostname + '] a user disconnected');

		client.get("foo_key", function(err, reply) {
			io.emit(value);
		});
	});

	s.on('chat message', function(msg){
		io.emit('chat message', '[' + hostname + '] ' + msg);
	});
});

server.listen(app.get('port'));
