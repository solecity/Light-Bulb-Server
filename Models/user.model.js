const mongoose = require("../Database/connection.js");
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
    profilePic: String,
    units: [{
        unitId: Number,
        courseId: Number
    }],
    notifications: [{
        _id: [mongoose.Schema.Types.ObjectId],
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
        medals: Array,
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