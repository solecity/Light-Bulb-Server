const mongoose = require("../Database/connection.js");
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
    description: {
        type: String,
        default: ""
    },
    teacher: {
        name: {
            type: String,
            required: true
        },
        email: {
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
        type: [String],        
        required: true
    }
});

const Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;