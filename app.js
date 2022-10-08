const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dbconnection = require('./config/dbconnection')
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const authRoutes = require('./routes/authRoutes');
const adminloginRouter = require('./routes/adminlogin');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const session = require('express-session');
const app = express();

// Clear Cache
app.use((req, res, next) => {
  console.log('cache');
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next()
})

//session
app.use(session({
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxage: 600000 }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//morgan logger
app.use(logger('dev'));

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//middle ware jwt user token are valid
app.get('*', checkUser);

//database connection
app.use(dbconnection);

//rout setting
app.use('/', userRouter);
app.use('/admin', adminRouter);
app.use('/adminlogin', adminloginRouter);

//authentication routes included
app.use(authRoutes);

app.use('/admin/add-product', adminRouter);



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
  res.render('error');
});

module.exports = app;
