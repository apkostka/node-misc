module.exports = function(mongoose, models){
	var collection = 'streams';
	var Schema = mongoose.Schema;
	var ObjectId = Schema.ObjectId;

	var schema = new Schema({
	  name: String,
	  posts: [models.Post],
	  posts_cache: [models.Post_Cache]
	});

	return mongoose.model(collection, schema);
}