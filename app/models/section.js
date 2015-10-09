var mongoose = require('mongoose');
var utils = require('../../lib/utils')
var Schema = mongoose.Schema;

var SectionSchema = new Schema({
  lession_id: {
    type: Schema.ObjectId,
    require: true,
  },
  title: {
    type: String
  },
  section_type: {
    type: String,
    enum: ['main', 'ministory', 'vocabulary']
  },
  content: {
    type: String
  },
  url: {
    type: String
  },
  created_at: {
    type: String,
    "default": new Date().ddmmyyyyWithScore()
  }
});

module.exports = mongoose.model('Section', SectionSchema);
