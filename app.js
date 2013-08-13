// Middleware
var express = require('express'),
		app = module.exports = express(),
		io = require('socket.io'),
		jade = require('jade'),
		mongoose = require('mongoose'),

		//Custom modules
		config = require('./app/config.js')(app, express);

/*Connect to MongoDB
var db_uri = config.default_db_uri;
mongoose.connect(db_uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
*/

var models = {};
models.users = require('./app/models/user')(app, mongoose)

//Presto.
app.listen(3000);