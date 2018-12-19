var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var projectRoute = require('./routes/project_route');

mongoose.connect('mongodb://localhost:27017/project')
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'frontend/map')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/scripts/handlebars', express.static(__dirname + '/node_modules/handlebars/dist/'));
app.use('/scripts/google', express.static(__dirname + '/node_modules/@google/markerclusterer/src/'));


app.use('/project', projectRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});

module.exports = app;
