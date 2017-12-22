var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');

router.get('/', function(req, res, next) {
  
  //ログイン失敗時のエラーメッセージ設定
  var errorMsg = '';
  var error = req.flash().error;
  if( error ){
    var errorMsg = error[0];
  }
  
  res.render('login', { title: 'Login', msg: errorMsg});
  
});

router.post('/',
  //passportを用いた認証処理実行
  passport.authenticate('local', { successRedirect: '/mypage', //認証成功時の画面遷移先を設定（今回はmypageを指定）
                                   failureRedirect: '/login',  //認証失敗時の画面遷移先を設定（今回はloginを指定）
                                   failureFlash: true,         //認証失敗時にflashメッセージを出力する設定
                                   session: true }),
  function(req, res, next){
    //res.send("login success");
  }
);

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/login");
});

//インデックスページへ戻る
router.get('/', function(req, res, next) {
  res.redirect('index');
});
module.exports = router;