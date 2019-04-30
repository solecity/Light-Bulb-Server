const mongoose = require("../Database/connection.js");
const Schema = mongoose.Schema;

const unitSchema = new Schema({
    unit: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true
    }
});
 
const Unit = mongoose.model('Unit', unitSchema);
 
module.exports = Unit;