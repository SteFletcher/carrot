var results = require(process.argv[2]);
console.log(process.argv[2]);
// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/snapshots');
var Snapshot     = require('./dev/models/snapshot');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
	console.log("connected...");
	//var perfResultSchema = mongoose.Schema(Snapshot);
	// NOTE: methods must be added to the schema before compiling it with mongoose.model()
	//var Result = mongoose.model('Snapshot', perfResultSchema);
	

	results.results.forEach(function(item){
		var hit = new Snapshot(item);
		hit.save(function (err, hit) {
		  if (err) return console.error(err);
		  console.log("saved: "+hit.uniqueURI);
		});
	});

	Snapshot.find(function (err, snapshots) {
	  if (err) return console.error(err);
	  console.log(snapshots.length);

	});

});

