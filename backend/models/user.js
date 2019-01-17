var mongoose = require('mongoose');

// logged user
var User = mongoose.model('User', {
    oauthID: String,
    name: String,
    created: Date,
    role: String,
    email: String
});

module.exports = User;