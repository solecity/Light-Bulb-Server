const mongoose = require("../Database/connection.js");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    id: Number,
    course: String,
    courseUnits: [{
        id: Number,
        unit: String,
        year: Number
    }]
});
 
const Course = mongoose.model('Course', courseSchema);
 
module.exports = Course;