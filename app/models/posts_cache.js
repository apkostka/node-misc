module.exports = function(mongoose, models){
	var collection = 'posts_cache';
	var Schema = mongoose.Schema;
	var ObjectId = Schema.ObjectId;

	var schema = new Schema({
	  service_id: String,
	  service_type: String,
	  content: String,
	  date: Date,
	  createdAt: {
	  	type: Date,
	  	expires: '7d',
	  	default: Date.now
	  }
	});

	return mongoose.model(collection, schema);
}