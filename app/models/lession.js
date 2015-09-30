var mongoose = require('mongoose');
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
  }]
});

module.exports = mongoose.model('Lession', LessionSchema);
