var express = require('express');
var app = new express.Router();

var env = process.env.NODE_ENV || 'development';
var config = require('../config.js')[env];

// Setup CORS
app.use(function(req, res, next) {
  // Website you wish to allow to connect

  var allowedOrigins = config.corsUrls;
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/', function(req, res) {
  res.send("<p>Root of the Tin League Chooser API</p>");
});

app.use('/players', require('./players'));

app.use('/games', require('./games'));

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                Export
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

module.exports = app;
