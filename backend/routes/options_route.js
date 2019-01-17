var express = require('express');
var router = express.Router();
var controller = require("../controllers/options_controller");
var hand = require('./auth_req_handlers')

router.get('/', (req, res) => {
  controller.findAll(req, res)
});

router.post('/', hand.isAdmin, (req, res) => {
  controller.save(req, res)
});

module.exports = router;