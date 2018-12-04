var express = require('express');
var router = express.Router();

var locations = [
  { title: 'Casa', lat: -34.5729377, long: -58.4795286 },
  { title: 'Trabajo', lat: -34.5471139, long: -58.4869242 },
  { title: 'Bibi y Oreste', lat: -34.573464, long: -58.478085 },
  { title: 'Interelec', lat: -34.597969, long: -58.459113 },
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(locations));
});

module.exports = router;