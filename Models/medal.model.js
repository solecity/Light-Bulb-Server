const mongoose = require("../Database/connection.js");
const Schema = mongoose.Schema;

const medalSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});
 
const Medal = mongoose.model('Medal', medalSchema);

module.exports = Medal;