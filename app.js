var express = require('express'),
		jade = require('jade'),
		users,
		newUser,
		app = express();

app.configure('development', function() {
	app.use(express.logger());
  app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
  }));
});

app.set('views', __dirname + '/app/views')
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/assets'))
app.use(express.bodyParser())

/* Connect to mongodb, create models */
var models = require('./app/models.js');

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

// POST / - Create User
app.post('/', function(req, res) {
	newUser = new models.User({name: req.body.name});
	newUser.save();
	console.log(newUser);
	res.redirect('/')
})

// GET /*USER*/DELETE - Delete user
app.get('/:id/delete', function(req, res) {
	models.User.findByIdAndRemove(req.params.id, function(err, user) {
		if (err) res.send(500, { error: err })
		res.redirect('/')
	})
})


//Presto.
app.listen(3000);