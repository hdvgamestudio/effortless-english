var jwt                        = require('jsonwebtoken');
var config                     = require('../config/config');
var Error401                   = require('./errors/error401');

var authenticate = function(req, res, next) {
  // Check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // Decode token
  if (token) {
    // Verify secret and check expiration
    jwt.verify(token, config.secretKey, function(err, decoded) {
      if (err) {
        return next(new Error401(401, 'Invalid token'));
      } else {
        // If everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // If there is no token
    // Return 401 error
      return next(new Error401(401, 'No token provided'));
  }
}

module.exports = {
  authenticate : authenticate
}
