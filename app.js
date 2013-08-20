// Middleware
var express = require('express'),
		app = module.exports = express(),
		io = require('socket.io'),
		mongoose = require('mongoose'),

		//Custom modules
		config = require('./app/config.js')(app, express),
		helpers = require('./app/helpers.js')(config);

//Connect to MongoDB
var db_uri = config.default_db_uri;
mongoose.connect(db_uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
mongoose.set('debug', true);

//Models
var models = require('./app/models/streams')(mongoose, models);
//models.User = require('./app/models/users')(helpers.mongoose, models);

//Routes
require('./app/routes')(app, models, helpers, config)

//Presto.
app.listen(3000);