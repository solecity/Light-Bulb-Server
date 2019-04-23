const mongoose = require("../Database/connection.js");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    id: Number,
    tag: String
});
 
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;