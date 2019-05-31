

const mongoose = require("../database/connection.js");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    registerDate: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: String,
        require: true,
        default: "student"
    },
    profilePic: {
        type: String,
        default: "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
    },
    subscriptions: {
        type: Array,
        default: []
    },
    tags: {
        type: Array,
        default: []
    },
    questions: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    /*
    notifications: [{
        _id: ObjectId,
        category: String,
        message: String,
        date: {
            type: Date,
            default: Date.now()
        }
    }],*/
    gameElements: {
        xp: {
            type: Number,
            require: true,
            default: 0
        },
        level: {
            type: ObjectId,
            require: true
        },
        medals: {
            type: Array,
            require: true,
            default: []
        },
        reputation: {
            type: Number,
            require: true,
            default: 0
        }
    }
});

userSchema.pre("save", async function (next) {
    const salt = 10;
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;