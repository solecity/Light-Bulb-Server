const mongoose = require("../Database/connection.js");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    id: {
        type: Number,
        require: true
    },
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
    profilePic: String,
    units: [{
        unitId: String,
        courseId: Date
    }],
    notifications: [{
        type: String,
        message: String,
        date: {
            type: Date,
            default: Date.now()
        },
    }],
    gameElements: {
        xp: Number,
        levelXP: Number,
        level: Number,
        medals: [ id: Number ],
        reputation: Number
    }
});
 
userSchema.pre("save", async function(next) {
    const salt = 10;
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
     
    next();
})
 
const User = mongoose.model('User', userSchema);
 
module.exports = User;