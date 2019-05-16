var router = require('express').Router();
var passport = require('passport');
var controller = require('../controllers/user_controller');
var hand = require('./auth_req_handlers')

router.get('/login',
  passport.authenticate('google', {
    scope: ['email', 'profile']
  })
);

router.get('/login/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200).contentType;
});

router.get('/loggedUser', (req, res) => {
  controller.loggedUser(req, res);
});

router.get('/users', hand.isAdmin, (req, res) => {
  controller.find(res);
});

router.get('/users/:id/admin', hand.isAdmin, (req, res) => {
  controller.changeRole(req, res, 'ADMIN');
});

router.get('/users/:id/writer', hand.isAdmin, (req, res) => {
  controller.changeRole(req, res, 'WRITER');
});

router.get('/users/:id/viewer', hand.isAdmin, (req, res) => {
  controller.changeRole(req, res, 'VIEWER');
});

module.exports = router;