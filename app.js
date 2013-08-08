var jade = require('jade'),
	Twit = require('twit'),
	configure = require('./app/config.js'),
	models = require('./app/models.js'),
	newUser,
	app = require('express')(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

app.set('views', __dirname + '/app/views')
app.set('view engine', 'jade')
app.use(require('express').bodyParser())

server.listen(8080)

// GET / - Get Users
app.get('/', function(req, res) {
	models.User.find(function(err, users){
		res.render('index',
			{ 
				title: 'Home'
				//users: users
			}
		)
	})
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

// POST / - Create User
app.post('/', function(req, res) {
	newUser = new models.User({name: req.body.name});
	newUser.save();
	console.log(newUser);
	res.redirect('/')
})

// GET /:USER/DELETE - Delete user
app.get('/:id/delete', function(req, res) {
	models.User.findByIdAndRemove(req.params.id, function(err, user) {
		if (err) res.send(500, { error: err })
		res.redirect('/')
	})
})

//Presto.
app.listen(3000);