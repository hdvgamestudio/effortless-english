var mongoose = require('mongoose');
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
  url: {
    type: String
  }
});

module.exports = mongoose.model('Section', SectionSchema);
