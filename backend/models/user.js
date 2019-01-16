var mongoose = require('mongoose');

// logged user
var User = mongoose.model('User', {
    oauthID: Number,
    name: String,
    created: Date
});

module.exports = User;