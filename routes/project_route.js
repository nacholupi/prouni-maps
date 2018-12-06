var express = require('express');
var router = express.Router();
var controller = require("../backend/controllers/project_controller");

router.get('/', function (req, res, next) {
  controller.find(req, res)
});

router.get('/:id', function(req, res, next) {
  controller.findById(req, res)
});

router.post('/', function (req, res, next) {
  controller.save(req, res)
});

router.delete('/:id', function(req, res, next) {
  controller.delete(req, res)
});

router.put('/:id', function(req, res, next) {
  controller.update(req, res)
});

module.exports = router;