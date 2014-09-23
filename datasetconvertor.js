var resultSchema = {
      "uniqueURI": String,
      "avg_bytes": String,
      "avg_elapsed": String,
      "max_bytes": String,
      "max_elapsed": String,
      "min_elapsed": String,
      "count": String,
      "date": String
    };
var results = require(process.argv[2]);
console.log(process.argv[2]);
// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
	console.log("connected...");
	var perfResultSchema = mongoose.Schema(resultSchema);
	// NOTE: methods must be added to the schema before compiling it with mongoose.model()
	var Result = mongoose.model('PerfResult', perfResultSchema);
	Result.remove();

	results.results.forEach(function(item){
		var hit = new Result(item);
		hit.save(function (err, hit) {
		  if (err) return console.error(err);
		  console.log("saved: "+hit.uniqueURI);
		});
	});

	Result.find(function (err, perfresults) {
	  if (err) return console.error(err);
	  console.log(perfresults.length);

	});

});

