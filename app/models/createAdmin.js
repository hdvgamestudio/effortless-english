var User = require('./user');
var mongoose = require('mongoose');
var config = require('../../config/config');

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};
connect();

var user = new User({
  username: 'admin',
  password: '@Cafef911$'
})

console.log('Creating a new Admin..........');
user.save(function(err, data) {
  if (err) console.log("err");
  else {
    console.log("Admin account has been created successfully!")
    console.log(JSON.stringify(data));
  }
  mongoose.connection.close()
})
