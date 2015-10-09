var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;

// UserSchema schema
var UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true}
});
// Bcrypt middleware on UserSchemaSchema
UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

//Password verification
UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
/*
var User = module.exports;
var user = new User({
  username: 'admin',
  password: '@Cafef911$'
})

console.log('saving..........');
user.save(function(err, data) {
  if (err) console.log("err");
  else console.log(JSON.stringify(data));
})
*/
