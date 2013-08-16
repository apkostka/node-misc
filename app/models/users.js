module.exports = function(mongoose, models){
	var collection = 'users';
	var Schema = mongoose.Schema;
	var ObjectId = Schema.ObjectId;

	var schema = new Schema({
	  name: String,
	  streams: [models.Stream]
	});

	return mongoose.model(collection, schema);
}