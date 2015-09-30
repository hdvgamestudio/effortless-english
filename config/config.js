
/**
 * Module dependencies.
 */

var path = require('path');
var extend = require('util')._extend;

var development = require('./env/development');
var test = require('./env/test');
var production = require('./env/production');

var defaults = {
  root: path.normalize(__dirname + '/..')
}

/**
 * Expose
 * */

module.exports = {
  production: extend(defaults, production),
  development: extend(defaults, development),
  test: extend(defaults, test)
}[process.env.NODE_ENV || 'development'];
