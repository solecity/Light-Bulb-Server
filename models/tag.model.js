const mongoose = require("../database/connection.js");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    tag: {
        type: String,
        required: true,
        unique: true
    }
});
 
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;