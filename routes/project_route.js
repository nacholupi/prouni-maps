var express = require('express');
var router = express.Router();
var controller = require("../backend/controllers/project_controller");

router.get('/', function (req, res, next) {
  controller.find(req, res)
});

router.post('/', function (req, res, next) {
  controller.save(req, res)
});

module.exports = router;