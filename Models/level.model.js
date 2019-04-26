const mongoose = require("../Database/connection.js");
const Schema = mongoose.Schema;

const levelSchema = new Schema({
    label: String,
    maxXP: Number
});
 
const Level = mongoose.model('Level', levelSchema);

module.exports = Level;