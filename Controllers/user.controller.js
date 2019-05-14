

const User = require("../Models/user.model.js");

// GET ALL USERS
async function getUsers(req, res) {
    const error = "Cannot get users."

    //const query = User.find({});

    try {
        await User.find({}, function (err, user) {
            console.log("aaa")
            User.find({}).select('');
            return res.send(user);
        });
    }
    catch (err) {
        return res.status(404).send({ error: error + err });
    }
    /*
        query.select('');
    
        // execute query
        query.exec(function (err, user) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                console.log(user);
                res.send(user);
            }
        });*/
};

// GET USER BY ID
async function getUserByID(req, res) {
    const _id = req.params.id;
    const query = User.findOne({ _id });

    // selecting the `name` and `email` fields
    query.select('name email type');

    // execute query
    query.exec(function (err, user) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            console.log(user);
            res.send(user);
        }
    });
};

// ADD NEW USER
async function addUser(req, res) {
    const error = "Cannot add user."

    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        type: "student",
        profilePic: "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
        units: [],
        notifications: [],
        gameElements: {
            xp: 0,
            levelXP: 0,
            level: 1,
            medals: [1],
            reputation: 0
        }
    });

    try {
        newUser.save(function (user) {
            return res.send(user)
        });
    }
    catch (err) {
        return res.status(404).send({ error: error + err });
    }
};

// REMOVE USER
async function removeUserByID(req, res) {
    const _id = req.params.id;
    const error = "Cannot remove user.";

    try {
        if (await User.findOne({ _id })) {
            await User.findByIdAndDelete(_id);
            return res.send();
        }
        else {
            return res.status(404).send({ error: error + `Cannot find user id '${_id}'` });
        }
    }
    catch (err) {
        return res.status(404).send({ error: error + err });
    }
};

// export all functions
module.exports = {
    getUsers,
    getUserByID,
    addUser,
    removeUserByID
};
