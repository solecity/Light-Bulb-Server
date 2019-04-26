const mongoose = require("../Database/connection.js");
const Schema = mongoose.Schema;

const medalSchema = new Schema({
    label: String,
    type: String
});
 
const Medal = mongoose.model('Medal', medalSchema);

module.exports = Medal;