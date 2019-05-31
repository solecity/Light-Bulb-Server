const mongoose = require("../database/connection.js");
const Schema = mongoose.Schema;

const medalSchema = new Schema({
    medal: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    }
});
 
const Medal = mongoose.model('Medal', medalSchema);

module.exports = Medal;