
const mongoose = require("../Database/connection.js");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course: {
        type: String,
        require: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;