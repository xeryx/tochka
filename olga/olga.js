var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs')

var vmOpsApi = require('./routes/vmOpsApi');
var fileOpsApi = require('./routes/fileOpsApi');
var buildDirApi = require('./routes/buildDirApi');


var app = express(); 

//Serve static react build, once done
app.use(express.static('public'))

var server = require('http').Server(app);

//Middleware
var accessLogStreamReq = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
app.use(morgan('combined', {immediate: true, stream:accessLogStreamReq}))
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

//Mount routers
app.use('/vm', vmOpsApi);
app.use('/upload', fileOpsApi);
app.use('/builds', buildDirApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            status: err.status, 
            message: err.message,
            stack: err.stack
        });
    });
}

app.use(function(err, req, res, next) {
      res.status(404);
      return res.json({"success":"false"});
});

module.exports = {app: app, server: server};
