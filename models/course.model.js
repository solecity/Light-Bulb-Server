
const mongoose = require("../database/connection.js");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course: {
        type: String,
        require: true
    },
    level: {
        type: String,
        required: true
    },
    coordinator: {
        type: ObjectId,
        required: true
    },
    units: {
        type: Array,
        default: []
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;