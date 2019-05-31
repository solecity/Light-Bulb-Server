const mongoose = require("../Database/connection.js");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const unitSchema = new Schema({
    unit: {
        type: String,
        require: true,
        unique: true
    },
    year: {
        type: Number,
        require: true
    },
    teacher: {
        type: ObjectId,
        required: true
    },
    description: String,
    courses: {
        type: Array,
        required: true
    }
});

const Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;