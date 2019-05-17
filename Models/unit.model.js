const mongoose = require("../Database/connection.js");
const Schema = mongoose.Schema;

const unitSchema = new Schema({
    unit: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    description: String,
    teacher: {
        name: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            required: true
        },
        level: {
            type: String,
            required: true
        }
    },
    courses: {
        type: Array,
        require: true
    }
});
 
const Unit = mongoose.model('Unit', unitSchema);
 
module.exports = Unit;