var User = require("../models/user");

var userController = {};

userController.find = (res) => {
    User.find({}, { _id: 0, }, (err, users) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(users);
        }
    })
}

userController.changeRole = (req, res, theRole) => {
    User.findOneAndUpdate({ oauthID: req.params.id }, { role: theRole }, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else if (!user) {
            res.status(404).send('Not found');
        } else {
            res.status(200).send('OK')
        }
    })
}

userController.loggedUser = (req, res) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(404).send('Not found');
    }
}

module.exports = userController;