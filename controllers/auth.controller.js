const User = require("../models/user.model.js");
const jsonMessages = require("../jsonMessages/login.js");
const bcrypt = require("bcrypt");


async function login(req, res) {
    const { email, password } = req.body;

    console.log("email")
    try {
        const user = await User.findOne({ email: email }).lean();


        if (!user) {
            return res.status(jsonMessages.user.email.status).send(jsonMessages.user.email);
        }

        const passwordValid = bcrypt.compareSync(password, user.password);
        
        if (!passwordValid) {
            return res.status(jsonMessages.user.password.status).send(jsonMessages.user.password);
        }

        res.status(jsonMessages.user.signinSucces.status).send({ msg: jsonMessages.user.signinSucces, user: user });
    }
    catch (err) {
        return res.status(jsonMessages.user.error.status).send(jsonMessages.user.error);
    }
}

async function logout(req, res) {
    req.logout();
    return res.status(jsonMessages.user.logoutSuccess.status).send(jsonMessages.user.logoutSuccess);
}


// EXPORT ALL FUNCTIONS
module.exports = {
    login,
    logout
};