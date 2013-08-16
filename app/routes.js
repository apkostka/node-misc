module.exports = function(app, models, helpers, config){

	var stream,
			newPosts,
			posts = {};

	//READ INDEX
	app.get('/', function(req, res){
		
		//If query, get posts from Twitter
		if (typeof req.query.q !== 'undefined') {
			this.twitter.get('/search/tweets', { q: req.query.q, count: 5 }, function(err, reply){
       if(err) { console.log(err) }
       	console.log(reply);
       	newPosts = reply.statuses;

       	var stream = models.Stream.find({name:'sample'});

       	stream.findOne(function(err, stream){
       		if(err) console.log(err);
	       	//Save to posts-cache
					for (post in newPosts){
						stream.posts_cache.push({
							service_id: post.id_str,
							service_type: 'twitter',
							content: post.text,
							date: new Date(post.created_at),
							created_at: new Date()
						});
					};
					stream.save();
					posts = stream.posts_cache;
				});
     	});
		}

		res.render('index', { title: 'StreamGizmo', posts: posts }, function(err, html){
			if(err) console.log(err);
			res.send(html)
		})
	})

	//CREATE NEW STREAM
	app.post('/streams/new', function(req,res){
		stream = new models.Stream({ name: req.body.name });
		stream.save(function(err){
			if(err) console.log(err);
			console.log(stream);
			res.redirect('/streams/'+stream.id);
		})
	})

	//READ LIST OF STREAMS
	app.get('/streams', function(req, res){

	})

	//READ SINGLE STREAM
	app.get('/streams/:id', function(req, res){

	})

	//ADD ITEM(S) TO STREAM
	app.post('/streams/:id', function(req, res){

	})

}