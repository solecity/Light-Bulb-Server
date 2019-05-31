const mongoose = require("../database/connection.js");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const unitSchema = new Schema({
    unit: {
        type: String,
        require: true,
        unique: true
    },
    teacher: {
        type: ObjectId,
        required: true
    },
    description: String,
    year: {
        type: Number,
        require: true
    },
    courses: {
        type: Array,
        required: true
    }
});

const Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;