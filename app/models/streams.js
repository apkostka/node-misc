module.exports = function(mongoose, models){
	var collection = 'streams';
	var Schema = mongoose.Schema;
	var ObjectId = Schema.ObjectId;

	this.PostCacheSchema = new Schema({
  	service_type: String,
	  service_id: {
	  	type: String,
	  	index: {
	  		unique: true
	  	}
	  },
	  query: String,
	  user_id: String,
	  content: String,
	  date: Date,
	  created_at: {
	  	type: Date,
	  	expires: 10
	  }
	});

	this.PostSchema = new Schema({
	  service_type: String,
	  service_id: {
	  	type: String,
	  	index: {
	  		unique: true
	  	}
	  },
	  query: String,
	  user_id: String,
	  content: String,
	  date: Date
	});

	this.StreamSchema = new Schema({
	  name: {
	  	type: String,
	  	index: {
	  		unique: true
	  	}
	  },
	  posts_cache: [this.PostsCacheSchema],
	  posts: [this.PostsSchema]
	});

	this.PostCache = mongoose.model('PostCache', this.PostCacheSchema);
	this.Post = mongoose.model('Post', this.PostSchema);
	this.Stream = mongoose.model('Stream', this.StreamSchema);

	return this;
}