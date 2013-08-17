module.exports = function(mongoose, models){
	var collection = 'posts_cache';
	var Schema = mongoose.Schema;
	var ObjectId = Schema.ObjectId;

	var schema = new Schema({
	  service_type: String,
	  service_id: String,
	  user_id: String,
	  content: String,
	  date: Date,
	  createdAt: {
	  	type: Date,
	  	expires: '0.5h',
	  	default: Date.now
	  }
	});

	return mongoose.model(collection, schema).schema;
}