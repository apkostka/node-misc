// Middleware
var express = require('express'),
		app = module.exports = express(),
		io = require('socket.io'),

		//Custom modules
		config = require('./app/config.js')(app, express),
		helpers = require('./app/helpers.js')(config);

//Connect to MongoDB
var db_uri = config.default_db_uri;
mongoose.connect(db_uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//Models
var models = {};
models.Post_Cache = require('./app/models/posts_cache')(helpers.mongoose, models);
models.Post = require('./app/models/posts')(helpers.mongoose, models);
models.Stream = require('./app/models/streams')(helpers.mongoose, models);
models.User = require('./app/models/users')(helpers.mongoose, models);

//Routes
require('./app/routes')(app, models, helpers, config)

//Presto.
app.listen(3000);