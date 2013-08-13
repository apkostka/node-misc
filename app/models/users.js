module.exports = function(mongoose){
	var collection = 'users';
	var Schema = mongoose.Schema;
	var ObjectId = Schema.ObjectId;

	var schema = new Schema({
	  name: String
	});

	return mongoose.model(collection, schema);
}