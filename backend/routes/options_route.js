var express = require('express');
var router = express.Router();
var controller = require("../controllers/options_controller");

router.get('/', (req, res, next) => {
  controller.findAll(req, res)
});

router.post('/', (req, res, next) => {
  controller.save(req, res)
});

module.exports = router;