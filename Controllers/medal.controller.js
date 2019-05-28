

const Medal = require("../Models/medal.model.js");
const jsonMessages = require("../Assets/jsonMessages/bd.js");


// GET ALL MEDALS
async function getMedals(req, res) {
    try {
        const count = await Medal.countDocuments();
        const result = await Medal.find();

        if (count === 0) {
            return res.status(jsonMessages.notFound.noRecords.status).send(jsonMessages.notFound.noRecords);
        }
        else {
            return res.send(result);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// GET MEDAL BY ID
async function getMedalByID(req, res) {
    const _id = req.params.id;

    try {
        const result = await Medal.findOne({ _id });

        if (result) {
            return res.send(result);
        }
        else {
            return res.status(jsonMessages.notFound.noRecordsId.status).send(jsonMessages.notFound.noRecordsId);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// ADD NEW MEDAL
async function addMedal(req, res) {
    let newMedal = new Medal(req.body);

    try {
        newMedal.save(function (err, medal) {
            if (err) {
                return res.status(jsonMessages.error.errorInsert.status).send(jsonMessages.error.errorInsert);
            }
            else {
                return res.status(jsonMessages.success.successInsert.status).send({ msg: jsonMessages.success.successInsert, data: medal });
            }
        });
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// REMOVE MEDAL BY ID
async function removeMedalByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Medal.findOne({ _id });
        const result = await Medal.findByIdAndDelete({ _id });
        
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
    getMedals,
    getMedalByID,
    addMedal,
    removeMedalByID
};
