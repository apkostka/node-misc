module.exports = function(app, models, helpers, config){

	//READ INDEX
	app.get('/', function(req, res){
		models.Stream.findOne({ name: 'sample' }, function(err, stream){
			/*if (stream.posts_cache.length !== 0){
				stream.findOne({ 'posts_cache.query': 'nba' }, { 'posts_cache.service_id': 1 },
					function(err, posts_cache){
						if(err) console.log(err);
						console.log(posts_cache);
					}
				);
			}*/
			if(err) res.json(err) 
			res.render('index', { title: 'StreamGizmo', posts_cache: stream.posts_cache, posts: stream.posts }, function(err, html){
				if(err) console.log(err);
				res.send(html);
			});
		});
	});

	app.post('/', function(req,res){

		models.Stream.findOne({name: 'sample'}, function(err,stream){
			/* Get ID of last tweet retrieved
			if (stream.posts_cache.length !== 0){
				var twitter_max_id = stream.posts_cache.sort("service_id")[stream.posts_cache.length - 1].service_id;
			}
			*/

			helpers.twitter.get('/search/tweets', { q: req.body.q + '-RT', count: 5, lang: 'en' }, function(err, reply){
				if(err) { console.log(err) };
				
				reply.statuses.forEach(function(el, index){
					
					stream.posts_cache.push({
						service_id: el.id_str,
						service_type: 'twitter',
						query: req.body.q,
						user_id: el.user.id_str,
						content: el.text,
						date: Date(el.created_at),
						created_at: new Date(Date())
					});

				});
				stream.save(function(err){
					if(err) console.log(err);
					res.redirect('/');
				});

			});
		});

	})

	//CREATE NEW STREAM
	app.post('/streams/new', function(req,res){
		stream = new models.Stream({ name: req.body.name });
		stream.save(function(err){
			if(err) console.log(err);
			console.log(stream);
			res.redirect('/');
		})
	})

	//NEW STREAM FORM
	app.get('/streams/new', function(req, res){
		res.render('new-stream', {title: "New Stream"}, function(err,html){
			if(err) console.log(err);
			res.send(html);
		})
	})

	//CLEAR STREAM CACHE
	app.get('/streams/clear', function(req,res){
		models.Stream.findOne({ name: 'sample' }, function(err, stream){
			stream.update({posts_cache: [], posts: []}, function(err){
				if(err) res.json(err);
				res.redirect('/');
			});
		});
	})


	//READ SINGLE STREAM
	app.get('/streams/:id', function(req, res){

	})

	//ADD ITEM(S) TO STREAM
	app.post('/streams/:id', function(req, res){
		models.Stream.findOne({ name: 'sample' }, function(err, stream){
			if(err) res.json(err);
			var postID = stream.posts_cache.id(req.params.id);
			stream.posts.push({
					service_id: postID.service_id,
					service_type: postID.service_type,
					user_id: postID.user_id,
					content: postID.content,
					date: postID.created_at
			});

			stream.save(function(err){
				if(err) console.log(err);
				res.redirect('/');
			});
		});
	})

}