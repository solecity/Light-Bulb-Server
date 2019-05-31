const mongoose = require("../database/connection.js");
const Schema = mongoose.Schema;

const levelSchema = new Schema({
    level: {
        type: String,
        required: true,
        unique: true
    },
    maxXP: {
        type: Number,
        required: true
    }
});
 
const Level = mongoose.model('Level', levelSchema);

module.exports = Level;