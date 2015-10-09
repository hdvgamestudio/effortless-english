var mongoose = require('mongoose');
var utils = require('../../lib/utils')
var Schema = mongoose.Schema;

var LessionSchema = new Schema({
  cd_id: {
    type: Schema.ObjectId,
    require: true,
  },
  title: {
    type: String,
    require: true
  },
  sections: [{
    type: Schema.ObjectId,
    ref: 'Section'
  }],
  created_at: {
    type: String,
    "default": new Date().ddmmyyyyWithScore()
  }
});

module.exports = mongoose.model('Lession', LessionSchema);
