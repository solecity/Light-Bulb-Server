const mongoose = require("../database/connection.js");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: String,
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
    upvotes: {
        type: Array,
        default: []
    },
    downvotes: {
        type: Array,
        default: []
    },
    locked: {
        type: Boolean,
        required: true,
        default: false
    },
    answers: {
        type: [{
            //_id: ObjectId,
            description: {
                type: String,
                require: true
            },
            user: {
                type: ObjectId,
                require: true
            },
            date: {
                type: Date,
                default: Date.now()
            },
            upvotes: {
                type: Array,
                default: []
            },
            downvotes: {
                type: Array,
                default: []
            },
        }],
        default: []
    },
    followers: {
        type: Array,
        default: []
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
