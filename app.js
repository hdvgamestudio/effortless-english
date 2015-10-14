var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var errorHandler = require('./lib/errors/errorHandler');
var config = require('./config/config');

var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT  || 3000;
// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};
connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Use morgan to log requests to the console
app.use(morgan('dev'));

// Use the body-parser to parse the body of a request
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// Register router
require('./app/routes')(app);

// Set error handler for whole app
errorHandler(app);

app.listen(port, ipaddress);
console.log('Express app started on port ' + port);
