module.exports = function(config){
	//Twitter
	var Twit = require('twit')
	this.twitter = new Twit({
		consumer_key: config.services.twitter.consumer_key,
		consumer_secret: config.services.twitter.consumer_secret,
		access_token: config.services.twitter.access_token,
		access_token_secret: config.services.twitter.access_token_secret
	})
	
	//Facebook
	this.facebook = require('fb')
	facebook.options({
		appId: config.services.facebook.appId,
		appSecret: config.services.facebook.appSecret,
		redirectUri: 'http://localhost:3000'
	})

	//Flickr
	this.flickr = require('flickr')

	//RSS
	this.feedparser = require('feedparser')

	//Youtube
	this.youtube = require('youtube-feeds')

	//Instagram
	this.instagram = require('instagram-node-lib')

	//Vimeo
	this.vimeo = require('n-vimeo')

	return this;
}