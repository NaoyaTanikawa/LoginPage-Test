var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require("passport-local").Strategy;
var flash = require('connect-flash');
var session = require("express-session");
var db = require('./db');
var result = "";

var index = require('./routes/index');
//var users = require('./routes/users');
var test = require('./routes/test');
var login = require('./routes/login');
var mypage = require('./routes/mypage');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(session({
    secret: 'testtesttest', //セッションのハッシュ文字列。任意に変更すること。
    resave: true,
    saveUninitialized: true 
}));
//passportの初期化
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
//app.use('/users', users);
app.use('/test', test);
app.use('/login', login);
app.use('/mypage', mypage);
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/login");
});

//セッション管理
passport.serializeUser(function(user, done) {
    console.log('user.id=' + user.id);
    done(null, user.id);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

//passportの認証処理
passport.use(new LocalStrategy(
  {
    usernameField: 'Email',
  },
  function(username, password, done) {
    // テスト用ユーザー
    var user = {id:"test", Email:"user@aaa.com",password:"password"};
    console.log('testdata.id ' + user.id);
    // 認証。
    if(username == user.Email && password == user.password){
      console.log('Authentication OK');
      return done(null, user);
    }
    
    return done(null, false, { message: 'ログインに失敗しました。' });
  }
));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
