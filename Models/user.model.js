

const mongoose = require("../Database/connection.js");
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
        type: [ObjectId],
        default: []
    },
    tags: {
        type: [ObjectId],
        default: []
    },
    questions: {
        type: [ObjectId],
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
            default: "Principiante"
        },
        medals: {
            type: [ObjectId],
            default: ["Bem-vindo"]
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