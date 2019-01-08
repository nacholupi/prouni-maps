var mongoose = require('mongoose');

var optionsSchema = new mongoose.Schema({
  map: {
    type: Map,
    of: [String]
  }
});

module.exports = mongoose.model('Options', optionsSchema);
