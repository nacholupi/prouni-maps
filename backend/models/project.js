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
    university: String,
    subject: String,
    purpose: String,
    link: String,
    target_population: [String],
    from_date: Date,
    to_date: Date,

    ref_name: String,
    ref_title: String,
    ref_phone: String,
    ref_mail: String,
    place: String,
    location: {
        type: pointSchema,
        required: true
    }
});

module.exports = mongoose.model('Project', projectSchema);