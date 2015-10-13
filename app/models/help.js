var mongoose = require('mongoose');
var utils = require('../../lib/utils')
var Schema = mongoose.Schema;

var HelpSchema = new Schema({
  language: {
    type: String
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  created_at: {
    type: String,
    "default": new Date().ddmmyyyyWithScore()
  }
});

module.exports = mongoose.model('Help', HelpSchema);

