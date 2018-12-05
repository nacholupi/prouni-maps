var mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

var projectSchema = new mongoose.Schema({
    title: String,
    location: {
        type: pointSchema,
        required: true
    }
});

module.exports = mongoose.model('Project', projectSchema);