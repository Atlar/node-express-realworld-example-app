console.log("start importing...");

var http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');

console.log("finished importing...");
console.log("starting express...");

var isProduction = process.env.NODE_ENV === 'production';

// Create global app object
var app = express();

console.log("express have been started...");
console.log("adding middleware...");

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

console.log("base middleware have been added...");

if (!isProduction) {
  app.use(errorhandler());
}

console.log("connect to mongoose...");

if(isProduction){

  console.log("connect to atlas...");
  mongoose.connect(process.env.MONGODB_URI);

} else {

  console.log("connect to atlas...");
  mongoose.connect(process.env.MONGODB_URI);

//  console.log("connect to local...");
//  mongoose.connect('mongodb://localhost/conduit');
//  mongoose.set('debug', true);

}

require('./models/User');
require('./models/Article');
require('./models/Comment');
require('./config/passport');

app.use(require('./routes'));

app.get('/', function(req, res) {
    console.log("giving file...");
    res.sendFile(path.join(__dirname + '/public/react_frontend/public/index.html'));
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/react_frontend/public/index.html'));
});

// finally, let's start our server...
var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});
