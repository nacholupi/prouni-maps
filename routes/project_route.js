var express = require('express');
var router = express.Router();
var controller = require("../backend/controllers/project_controller");

router.get('/', (req, res, next) => {
  controller.find(req, res)
});

router.get('/:id', (req, res, next) => {
  controller.findById(req, res)
});

router.post('/', (req, res, next) => {
  controller.save(req, res)
});

router.delete('/:id', (req, res, next) => {
  controller.delete(req, res)
});

router.put('/:id', (req, res, next) => {
  controller.update(req, res)
});

module.exports = router;