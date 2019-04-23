const mongoose = require("../Database/connection.js");
const Schema = mongoose.Schema;

const medalSchema = new Schema({
    id: Number,
    label: String,
    type: String
});
 
const Medal = mongoose.model('Medal', medalSchema);

module.exports = Medal;