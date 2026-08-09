require('dotenv').config();
var profileRouter = require('./routes/profile');
var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
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
var notificationsRouter = require('./routes/notifications');
var cron = require('node-cron');
var updateMovieStats = require('./workers/updateMovieStats');
var tasteProfileRouter = require('./routes/tasteProfile');

var app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

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
app.use("/api/auth", authRoutes);
app.use('/api/movies', moviesRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/taste', tasteProfileRouter);

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

// Background worker: refresh movie stats every 10 minutes
cron.schedule('*/10 * * * *', () => {
  updateMovieStats();
});

// Run once on startup too, so stats aren't stale from the last shutdown
mongoose.connection.once('open', () => {
  updateMovieStats();
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