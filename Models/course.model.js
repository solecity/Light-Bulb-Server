
const mongoose = require("../Database/connection.js");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course: {
        type: String,
        require: true
    },
    units: [{
        unit: {
            type: String,
            require: true
        },
        year: {
            type: Number,
            require: true
        },
        teacher: {
            type: String,
            required: true
        }
    }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;