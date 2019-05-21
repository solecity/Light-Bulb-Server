

const User = require("../Models/user.model.js");


// GET ALL USERS
async function getUsers(req, res) {
    const error = "Cannot get users.";

    await User.find({}, function (err, user) {
        if (err) {
            return res.status(404).send({ error: error + err });
        }
        else {
            User.find({}).select('');
            return res.send(user);
        }
    });
};


// GET USER BY ID
async function getUserByID(req, res) {
    const _id = req.params.id;

    await User.findOne({ _id }, function (err, user) {
        const error =`Cannot find user id '${_id}'.`;

        if (err) {
            return res.status(404).send({ error: error + err});
        }
        else {
            User.findOne({ _id }).select('');
            return res.send(user);
        }
    });
};


// ADD NEW USER
async function addUser(req, res) {
    let newUser = new User(req.body);
    const error = "Cannot add user."

    newUser.save(function (err, user) {
        if (err) {
            return res.status(404).send({ error: error + err });
        }
        else {
            return res.send(user)
        }
    });
};


// REMOVE USER BY ID
async function removeUserByID(req, res) {
    const _id = req.params.id;
    const error = `Cannot remove user. Cannot find user with id '${_id}'.`;
/*
    await User.findOne({ _id }, function (err, user) {
        if (err) {
            return res.status(404).send({ error: error + err });
        }
        else {*/
            User.findByIdAndDelete(_id, function (err, user) {

                if (err) {
                    return res.status(404).send({ error: error +  err });
                }
                else {
                    return res.send(user);
                }
            });
        //}
    //});
};


// EXPORT ALL FUNCTIONS
module.exports = {
    getUsers,
    getUserByID,
    addUser,
    removeUserByID
};
