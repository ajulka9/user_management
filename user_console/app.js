var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash  = require('req-flash');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var secureRouter = require('./routes/secure');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("Welcome1"));
app.use(session({
	secret: "Welcome1",
	saveUninitialized: true,
	resave:true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(checkAuth);
app.use(flash());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/secure', secureRouter);

const PORT = process.env.PORT || 3000;
console.log("PORT : " + PORT);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

function checkAuth(req, res, next){
	console.log('checkAuth ' + req.url);

	// don't serve /secure to those not logged in
	// you should add to this list, for each and every secure url
	if (req.url.indexOf('/secure') == 0 && (!req.session || !req.session.authenticated)) {
		res.render('unauth', { title:'Un-Authorized', status: 401 });
		return;
	}

	next();
}

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
