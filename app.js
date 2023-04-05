var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
var brcypt = require('bcrypt');

var indexRouter = require('./routes/index');
var testRouter = require('./routes/test');
var userRouter = require('./routes/users');

var app = express();

const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/test', testRouter);
app.use('/users', userRouter);


app.listen(port, () => {
    console.log("App is running on port " + port);
  });

module.exports = app;
