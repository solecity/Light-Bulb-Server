

const Level = require("../Models/level.model.js");


// GET ALL LEVELS
async function getLevels(req, res) {
    const error = "Cannot get levels."

    await Level.find({}, function (err, level) {
        if (err) {
            return res.status(404).send({ error: error + err });
        }
        else {
            Level.find({}).select('');
            return res.send(level);
        }
    });
};

// GET LEVEL BY ID
async function getLevelByID(req, res) {
    const _id = req.params.id;

    await Level.findOne({ _id }, function (err, level) {
        if (err) {
            return res.status(404).send({ error: `Cannot find level id '${_id}'` });
        }
        else {
            Level.findOne({ _id }).select('');
            return res.send(level);
        }
    });
};

// ADD NEW LEVEL
async function addLevel(req, res) {
    let newLevel = new Level(req.body);
    const error = "Cannot add level."

    newLevel.save(function (err, level) {
        if (err) {
            return res.status(404).send({ error: error + err });
        }
        else {
            return res.send(level);
        }
    });
};

// REMOVE LEVEL BY ID
async function removeLevelByID(req, res) {
    const _id = req.params.id;
    const error = "Cannot remove Level.";

    Level.findByIdAndDelete(_id, function (err, level) {
        if (err) {
            return res.status(404).send({ error: error + ` Cannot find Level with id '${_id}'` });
        }
        else {
            return res.send(level);
        }
    });
};


// EXPORT ALL FUNCTIONS
module.exports = {
    getLevels,
    getLevelByID,
    addLevel,
    removeLevelByID
};
