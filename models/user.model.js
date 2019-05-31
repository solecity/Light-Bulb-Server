

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
            default: 0
        },
        maxXP: {
            type: Number,
            default: 10
        },
        level: {
            type: ObjectId,
            default: "5ced87ad24cf640ffcf75bc1"
        },
        medals: {
            type: Array,
            default: ["5ced63c6afd8de22bc5a5177"]
        },
        reputation: {
            type: Number,
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