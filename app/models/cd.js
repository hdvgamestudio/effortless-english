var mongoose = require('mongoose');
var utils = require('../../lib/utils')
var Schema = mongoose.Schema;

var CDSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  lessions: [{
    type: Schema.ObjectId,
    ref: 'Lession'
  }],
  created_at: {
    type: String,
    "default": new Date().ddmmyyyyWithScore()
  }
});

module.exports = mongoose.model('CD', CDSchema);

