const mongoose = require("../database/connection.js");
const ObjectId = mongoose.Schema.Types.ObjectId;
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
        type: ObjectId,
        required: true
    },
    course: {
        type: ObjectId,
        required: true
    },
    unit: {
        type: ObjectId,
        required: true
    },
    tags: {
        type: Array,
        require: true
    },
    images: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now()
    },
    view: {
        type: Number,
        default: 0
    },
    upvote: {
        type: Array,
        default: []
    },
    downvote: {
        type: Array,
        default: []
    },
    locked: {
        type: Boolean,
        required: true
    },
    answers: [{
        //_id: ObjectId,
        user: {
            type: ObjectId,
            require: true
        },
        date: {
            type: Date,
            default: Date.now()
        },
        answer: {
            type: String,
            require: true
        },
        upvote: {
            type: Array,
            default: []
        },
        downvote: {
            type: Array,
            default: []
        },
    }],
    followers: {
        type: Array,
        default: []
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
