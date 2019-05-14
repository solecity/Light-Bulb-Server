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
    user: {
        name: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            required: true
        },
        level: {
            type: String,
            required: true
        }
    },
    course: String,
    unit: String,
    tags: {
        type: Array,
        require: true
    },
    images: Array,
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
        user: {
            name: String,
            profilePic: String,
            level: String
        },
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