var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/portfolio/profile');
});
router.get('/profile', function(req, res, next) {
  res.render('Registration');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;