

const Level = require("../models/level.model.js");
const jsonMessages = require("../jsonMessages/db.js");


// GET ALL LEVELS
async function getLevels(req, res) {
    try {
        const count = await Level.countDocuments();
        const search = await Level.find();

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


// GET LEVEL BY ID
async function getLevelByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Level.findOne({ _id });

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


// CREATE NEW LEVEL
async function createLevel(req, res) {
    const _level = req.body.level;
    const newLevel = new Level(req.body);

    try {
        const search = await Level.findOne({ "level": _level });
        const result = newLevel.save();

        if (search) {
            return res.status(jsonMessages.error.duplicateData.status).send(jsonMessages.error.duplicateData);
        }
        else {
            if (result) {
                return res.status(jsonMessages.success.successInsert.status).send({ msg: jsonMessages.success.successInsert, data: newLevel });
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


// DELETE LEVEL BY ID
async function deleteLevelByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Level.findOne({ _id });
        const result = await Level.findByIdAndDelete({ _id });
        
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


// UPDATE LEVEL BY ID
async function updateLevelByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Level.findOne({ _id });
        const result = await Level.findByIdAndUpdate(_id, req.body, {new: true});
        
        if (search) {
            if (result) {
                return res.status(jsonMessages.success.successUpdate.status).send({ msg: jsonMessages.success.successUpdate, data: result });
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
    getLevels,
    getLevelByID,
    createLevel,
    deleteLevelByID,
    updateLevelByID
};
