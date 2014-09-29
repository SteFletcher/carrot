// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SnapshotSchema   = new Schema({
      "uniqueURI": String,
      "avg_bytes": String,
      "avg_elapsed": String,
      "max_bytes": String,
      "max_elapsed": String,
      "min_elapsed": String,
      "count": String,
      "date": String
    });

module.exports = mongoose.model('Snapshot', SnapshotSchema);