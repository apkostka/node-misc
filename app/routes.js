module.exports = function(app, models, helpers, config){

	var stream,
			newPosts,
			posts = {};

	//READ INDEX
	app.get('/', function(req, res){
		models.Stream.findOne({ name: 'sample' }, function(err, stream){
			var twitter_max_id = stream.posts_cache.sort('field -service_id');
			console.log(twitter_max_id);
			twitter_max_id.forEach(function(el, index){
				console.log(el.service_id);
			})

			if(err) res.json(err) 
			res.render('index', { title: 'StreamGizmo', posts: stream.posts_cache }, function(err, html){
				if(err) console.log(err);
				res.send(html);
			});
		});
	});

	app.post('/', function(req,res){

		models.Stream.findOne({name: 'sample'}, function(err,stream){
			var twitter_max_id = stream.posts_cache.sort('field service_id')[0];
			console.log(twitter_max_id);

			helpers.twitter.get('/search/tweets', { q: req.body.q + '-RT', count: 5, since_id: twitter_max_id }, function(err, reply){
				if(err) { console.log(err) };
				
				reply.statuses.forEach(function(el, index){
					
					stream.posts_cache.push({
						service_id: el.id_str,
						service_type: 'twitter',
						user_id: el.user.id_str,
						content: el.text,
						date: new Date(el.created_at)
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

	app.get('/streams/clear', function(req,res){
		models.Stream.findOne({ name: 'sample' }, function(err, stream){
			stream.update({posts_cache: []}, function(err){
				if(err) res.json(err);
				res.redirect('/');
			});
		});
	})

	//READ LIST OF STREAMS
	app.get('/streams', function(req, res){
		res.render('new-stream', {title: "New Stream"}, function(err,html){
			if(err) console.log(err);
			res.send(html);
		})
	})

	//READ SINGLE STREAM
	app.get('/streams/:id', function(req, res){

	})

	//ADD ITEM(S) TO STREAM
	app.post('/streams/:id', function(req, res){

	})

}