const mongoose = require("../Database/connection.js");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    idUser: Number,
    idCourse: Number,
    tags: [{
        idTag: Number,
        require: true
    }],
    files: {
        type: String,
        url: String
    },
    images: {
        type: String,
        url: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    view: Number,
    upvote: Array,
    downvote: Array,
    locked: Boolean,
    answers: [{
        _id: [mongoose.Schema.Types.ObjectId],
        idUser: Number,
        date: {
            type: Date,
            default: Date.now()
        },
        answer: String,
        upvote: Array,
        downvote: Array,
    }],
    followers: Array
});
 
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;