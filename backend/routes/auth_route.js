var router = require('express').Router();
var passport = require('passport');

router.get('/login',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/login/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/');
  });

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;