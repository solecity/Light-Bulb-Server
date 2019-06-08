

const User = require("../models/user.model.js");
const jsonMessages = require("../jsonMessages/db.js");


// GET ALL USERS
async function getUsers(req, res) {
    try {
        const count = await User.countDocuments();
        const search = await User.find();

        if (count === 0) {
            return res.status(jsonMessages.notFound.noRecords.status).send(jsonMessages.notFound.noRecords);
        }
        else {
            return res.send(search);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// GET ALL USERS BASIC INFO (ID, NAME, TYPE)
async function getUsersBasicInfo(req, res) {
    let tempUser = [];

    try {
        const count = await User.countDocuments();
        const search = await User.find();

        for (let i = 0; i < search.length; i++) {
            tempUser.push({
                _id: search[i]._id,
                name: search[i].name,
                type: search[i].type
            })            
        }

        if (count === 0) {
            return res.status(jsonMessages.notFound.noRecords.status).send(jsonMessages.notFound.noRecords);
        }
        else {
            return res.send(tempUser);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// GET USER BY ID
async function getUserByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await User.findOne({ _id });

        if (search) {
            return res.send(search);
        }
        else {
            return res.status(jsonMessages.notFound.noRecordsId.status).send(jsonMessages.notFound.noRecordsId);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// CREATE NEW USER
async function createUser(req, res) {
    const _email = req.body.email;
    let newUser = new User(req.body);

    try {
        const search = await User.findOne({ "email": _email });
        const result = newUser.save();

        if (search) {
            return res.status(jsonMessages.error.duplicateData.status).send(jsonMessages.error.duplicateData);
        }
        else {
            if (result) {
                return res.status(jsonMessages.success.successInsert.status).send({ msg: jsonMessages.success.successInsert, data: newUser });
            }
            else {
                return res.status(jsonMessages.error.errorInsert.status).send(jsonMessages.error.errorInsert);
            }
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// DELETE USER BY ID
async function deleteUserByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await User.findOne({ _id });
        const result = await User.findByIdAndDelete({ _id });

        if (search) {
            if (result) {
                return res.status(jsonMessages.success.successDelete.status).send(jsonMessages.success.successDelete);
            }
            else {
                return res.status(jsonMessages.error.errorDelete.status).send(jsonMessages.error.errorDelete);
            }
        }
        else {
            return res.status(jsonMessages.notFound.noRecordsId.status).send(jsonMessages.notFound.noRecordsId);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// EXPORT ALL FUNCTIONS
module.exports = {
    getUsers,
    getUsersBasicInfo,
    getUserByID,
    createUser,
    deleteUserByID
};
