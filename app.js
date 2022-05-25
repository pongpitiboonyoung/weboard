var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
const db = require('./db/db')
const session = require('express-session')
const fs = require('fs')
const xss = require('xss-clean')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
var sess = {
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {}
}

app.use(cors())
app.use(xss())
app.use(mongoSanitize());
app.use(session(sess))

//all router
let user = require('./routes/user/router')
let webboard = require('./routes/weboard/router')
user(app)
webboard(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.status(err.status || 500);
  // res.render('error');
  res.status(err.status || 400).send({ status: false, msg: err.message, data: null })
});
// create folder uploads in public
fs.mkdir(path.join(__dirname + "/public/", 'uploads'),
  { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Directory created successfully!');
});

module.exports = app;
