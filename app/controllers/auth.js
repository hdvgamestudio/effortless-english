var User = require('../models/user');
var jwt  = require('jsonwebtoken');
var config = require('../../config/config')

exports.login = function(req, res, next) {
  var username = req.body.username || '';
  var password = req.body.password || '';

  if (username == '' || password == '') {
      return res.sendStatus(401);
  }

  User.findOne({username: username}, function (err, user) {
    if (err || !user) {
      return res.sendStatus(401);
    }

    user.comparePassword(password, function(isMatch) {
      if (!isMatch) {
        return res.sendStatus(401);
      }

      var token = jwt.sign(user, config.secretKey, { expiresIn: 60*60 });

      return res.json({token:token});
    });

  });
}
