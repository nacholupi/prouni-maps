var Options = require("../models/options");

var optionsController = {};

const ID = 'aaaaaaaaaaaaaaaaaaaaaaaa'

optionsController.save = function (req, res) {
    Options.findById(ID, function (err, opts) {
        if (err) {
            res.status(500).send(err)
        } else {
            if (!opts) {
                opts = new Options({ _id: ID, map: {} });
            }
            if (req.body.key && req.body.items) {
                opts.map.set(req.body.key, req.body.items);
                opts.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err)
                    } else {
                        console.log("Successfully created option.");
                        res.status(201).send(opts)
                    }
                });
            } else {
                res.status(404).send();
            }
        }
    })
};

optionsController.findAll = function (req, res) {
    Options.findById(ID, function (err, opts) {
        if (err) {
            console.log(err);
            res.status(500).send(err)
        } else {
            res.json(opts)
        }
    })
};

module.exports = optionsController;