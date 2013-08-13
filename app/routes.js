module.exports = function(app, mongoose, models, helpers){

	//GET /
	app.get('/', function(req, res){
		/*helpers.twitter.get('/search/tweets', { q: 'NHL', count: 1 }, function(err, reply){
			if(err) { res.send(err) }
			res.send(reply.statuses)
		})*/
		helpers.facebook.api('4', function(reply){
			if(!res || res.error) {
				console.log(res.error)
				return;
			}
			res.send(reply.name);
		})
	})

}