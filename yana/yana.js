"use strict"

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs')


var app = express();

var server = require('http').Server(app);

var powershell = require('./routes/powershell');
var fileops = require('./routes/fileops');

//Socket.io code 
var io = require('socket.io')(server);
io.set('transports', ['websocket','polling']);

app.use(function(req, res, next){
  res.io = io;
  next();
});

//Middleware
var accessLogStreamReq = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
app.use(morgan('combined', {immediate: true, stream:accessLogStreamReq}))
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Mount routers
app.use('/powershell/', powershell);
app.use('/upload/', fileops);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler 
if (app.get('env') === 'development') {
   app.use(function(err, req, res, next) {
       res.status(err.status || 500);
       res.json({
           //status: err.status, 
           message: err.message,
           //stack: err.stack,
           data:err.message
       });
   });
}
// non-development error handler 
if (app.get('env') !== 'development') {
   app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
          status: err.status, 
          message: "error"
      });
  });
}

module.exports = {app: app, server: server};
