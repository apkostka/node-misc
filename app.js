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
				title: 'Home',
				users: users
			}
		)
	})
});

io.sockets.on('connection', function (socket) {
  socket.on('addUser', function (data) {
    newUser = new models.User({name: data.name})
    newUser.save()
    io.sockets.emit('newUser', { name: newUser.name, id: newUser.id })
  });
  socket.on('deleteUser', function (data) {
    models.User.findByIdAndRemove(data.id, function(err, user) {
    	io.sockets.emit('deleteUser', { id: data.id })
    })
  });
});

// POST / - Create User
app.post('/', function(req, res) {
	newUser = new models.User({name: req.body.name});
	newUser.save();
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