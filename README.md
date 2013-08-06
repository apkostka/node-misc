StreamGizmo - Node Style
========================

To get this up and running:  
- Install [Node.js](http://nodejs.org/) and [NPM](https://npmjs.org/). Both can be installed using Homebrew.
- Install [MongoDB](http://docs.mongodb.org/manual/installation/) ang get it running: `mongod --fork --logpath path/to/mongodb.log`
- Start the MongoDB CLI with `mongo` and create the database: `db.streamgizmo.save( { a: 1 } )`
- Run `npm install` from the root directory to install the dependencies in package.json.
- Start node with `node app`. I recommend installing Nodemon with `npm install -g nodemon` and running with `nodemon app`.