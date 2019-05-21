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
        type: [String],
        require: true
    },
    images: [String],
    date: {
        type: Date,
        default: Date.now()
    },
    view: Number,
    upvote: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    downvote: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
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
        upvote: {
            type: [Number],
            default: 0
        },
        downvote: {
            type: [Number],
            default: 0
        },
    }],
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
