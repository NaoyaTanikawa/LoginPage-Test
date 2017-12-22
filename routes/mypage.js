var express = require('express');
var router = express.Router();

//セッションチェック
function isAuthenticated(req, res, next){
    console.log('req=' + req.session.passport.user);
    if (req.session.passport.user !== undefined) {  // 認証済
        return next();
    }
    else {  // 認証されていない
        res.redirect('/login');  // ログイン画面に遷移
    }
}

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  res.render('mypage', { title: 'ログイン成功！' });
});

//ログアウト処理
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/login");
});

module.exports = router;
