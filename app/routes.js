module.exports = function(app, mongoose, models, helpers){

	//GET /
	app.get('/', function(req, res){
		
		/*Twitter
		helpers.twitter.get('/search/tweets', { q: 'NHL', count: 1 }, function(err, reply){
			if(err) { res.send(err) }
			res.send(reply.statuses)
		})
		*/

		/*Facebook
		helpers.facebook.api('brookfieldla/posts', {access_token: '580626551988812|1ukVg4Yr_gtyzFAt2vrZUmyRpoQ' }, function(reply){
			if(!res || res.error) {
				console.log(res.error)
				return;
			}
			res.send(reply)
		})
		*/
		
	})

}