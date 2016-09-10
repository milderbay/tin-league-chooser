/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                               Config Setup
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// var env = process.env.NODE_ENV || 'development';
// var config = require('./config.js')[env];

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                               App Setup
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var express = require('express');
var app = express();

// Server public assets (used to renew SSL right now)
app.use(express.static('public'));

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                          Body Parser Setup
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                 Routing
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var router = require('./routers/router');
app.use(router);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                  Server
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var port = process.env.PORT || 5050;

var server = app.listen(port, function() {
  var host = '127.0.0.1'; // server.address().address;
  var port = server.address().port;

  console.log('Tin League Chooser API listening at http://%s:%s', host, port);
});

module.exports = server;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                              Socket IO
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  console.log('client connect');

  socket.on('disconnect', function() {
    console.log('client disconnect');
    socket.disconnect();
  });
});

*/

module.exports = server;
