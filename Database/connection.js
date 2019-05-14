const mongoose = require("mongoose");
//const config = require("../config")

const uri = `mongodb+srv://solecity:jaune111@project-jrryd.mongodb.net/lightBulbDB?retryWrites=true`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.Promise = global.Promise;

module.exports = mongoose;