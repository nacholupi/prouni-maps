var Project = require("../models/project");

var projectController = {};

projectController.save = (req, res) => {
    var project = new Project(req.body);
    var error = project.validateSync();

    if (error) {
        res.status(400).send(error.errors)
    } else {
        project.save((err) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                console.log("Successfully created project.");
                res.status(201).send(project);
            }
        });
    }
};

projectController.find = (req, res) => {
    Project.find({}, (err, projects) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.json(projects);
        }
    })
}

projectController.findById = (req, res) => {
    Project.findById(req.params.id, (err, project) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.json(project)
        }
    })
}

projectController.delete = (req, res) => {
    Project.findByIdAndRemove(req.params.id, (err, project) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.json(project)
        }
    })
}

projectController.update = (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body, (err, project) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.json(project);
        }
    })
}

module.exports = projectController;