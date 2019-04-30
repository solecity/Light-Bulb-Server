const mongoose = require("../Database/connection.js");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course: {
        type: String,
        require: true
    },
    courseUnits: {
        type: Array,
        require: true
    },
});
 
const Course = mongoose.model('Course', courseSchema);
 
module.exports = Course;