var express = require('express');
var router = express.Router();
var controller = require("../controllers/project_controller");
var hand = require('./auth_req_handlers')

router.get('/', (req, res) => {
  controller.find(req, res)
});

router.get('/:id', (req, res) => {
  controller.findById(req, res)
});

router.post('/', hand.isAdmin, (req, res) => {
  controller.save(req, res)
});

router.delete('/:id', hand.isAdmin, (req, res) => {
  controller.delete(req, res)
});

router.put('/:id', hand.isAdmin, (req, res) => {
  controller.update(req, res)
});

module.exports = router;