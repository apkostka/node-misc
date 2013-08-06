var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/streamgizmo');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
	name: String
});

/* create models */
var User = mongoose.model('User', userSchema);
module.exports.User = User;