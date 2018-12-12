var Project = require("../models/project");

var projectController = {};

projectController.save = function (req, res) {
    var project = new Project(req.body);
    var error = project.validateSync();

    if (error) {
        res.status(400).send(error.errors)
    } else {
        project.save(function (err) {
            if (err) {
                console.log(err);
                res.status(500).send(err)
            } else {
                console.log("Successfully created project.");
                res.status(201).send(project)
            }
        });
    }
};

projectController.find = function (req, res) {
    Project.find({}, function (err, projects) {
        if (err) {
            console.log(err);
            res.status(500).send(err)
        } else {
            res.json(projects)
        }
    })
}

projectController.findById = function (req, res) {
    Project.findById(req.params.id, function (err, project) {
        if (err) {
            console.log(err);
            res.status(500).send(err)
        } else {
            res.json(project)
        }
    })
}

projectController.delete = function (req, res) {
    Project.findByIdAndRemove(req.params.id, function (err, project) {
        if (err) {
            console.log(err);
            res.status(500).send(err)
        } else {
            res.json(project)
        }
    })
}

projectController.update = function (req, res) {
    Project.findByIdAndUpdate(req.params.id, req.body, function (err, project) {
        if (err) {
            console.log(err);
            res.status(500).send(err)
        } else {
            res.json(project)
        }
    })
}

module.exports = projectController;