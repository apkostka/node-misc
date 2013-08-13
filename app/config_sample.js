module.exports = function(app, express, mongoose){

  var config = this;

  app.requireAuth = false;

  //generic config
  app.configure(function(){
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'xx83983' }));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/assets'));
  });

  //env specific config
  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

    exports.default_db_uri = 'mongodb://localhost/streamgizmo';
  });

  app.configure('production', function(){
    app.use(express.errorHandler());

    exports.default_db_uri = 'mongodb://localhost/streamgizmo';
  });

	config.services = {
		//Place service keys/tokens here
	}

  return config;

};