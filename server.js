
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/users', user.list);

//Server the static angular spa html file
app.get('/', function (req, res) {
  res.sendfile('public/index.html');
});

app.get('/master',function (req,res){
	res.sendfile('public/master.html');
});

// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });

var server = http.createServer(app);
var io = require('socket.io').listen(server);


server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//Socket.io related logic.
io.sockets.on('connection', function (socket) {
  socket.emit('welcome', { message: 'Welcome to TechConnect\'s Consumer lending booth' });

  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('quiz', function(data){
  	var quiz = data;
  	console.log(quiz);
  	socket.broadcast.emit('quiz', quiz);
  });
});