const mongoose = require("../Database/connection.js");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course: {
        type: String,
        require: true
    },
    courseUnits: [{
        _id: [mongoose.Schema.Types.ObjectId],
        unit: String,
        year: Number
    }]
});
 
const Course = mongoose.model('Course', courseSchema);
 
module.exports = Course;