require('dotenv').config();
var profileRouter = require('./routes/profile');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var reviewsRouter = require('./routes/reviews');
var watchlistRouter = require('./routes/watchlist');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');
const authRoutes = require("./routes/authRoutes");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/profile', profileRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/watchlist', watchlistRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/auth", authRoutes);
app.use('/api/movies', moviesRouter);

const dns = require('dns');

// Force Node to use Google DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;