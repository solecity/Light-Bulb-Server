

const Medal = require("../models/medal.model.js");
const jsonMessages = require("../jsonMessages/db.js");


// GET ALL MEDALS
async function getMedals(req, res) {
    try {
        const count = await Medal.countDocuments();
        const search = await Medal.find();

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


// GET MEDAL BY ID
async function getMedalByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Medal.findOne({ _id });

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


// CREATE NEW MEDAL
async function createMedal(req, res) {
    const _medal = req.body.medal;
    const newMedal = new Medal(req.body);

    try {
        const search = await Medal.findOne({ "medal": _medal });
        const result = newMedal.save();

        if (search) {
            return res.status(jsonMessages.error.duplicateData.status).send(jsonMessages.error.duplicateData);
        }
        else {
            if (result) {
                return res.status(jsonMessages.success.successInsert.status).send({ msg: jsonMessages.success.successInsert, data: newMedal });
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


// DELETE MEDAL BY ID
async function deleteMedalByID(req, res) {
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
    createMedal,
    deleteMedalByID
};
