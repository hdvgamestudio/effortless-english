var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CDSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  lessions: [{
    type: Schema.ObjectId,
    ref: 'Lession'
  }]
});

module.exports = mongoose.model('CD', CDSchema);

