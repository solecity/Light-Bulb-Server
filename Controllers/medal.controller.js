

const Medal = require("../Models/medal.model.js");

const jsonMessages = require("../Assets/jsonMessages/bd.js");


// GET ALL MEDALS
async function getMedals(req, res) {
    try {
        let count = await Medal.size();
        if (count === 0) {
            return res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
        }
        else {
            return res.send(await Medal.find())
        }
    }
    catch (err) {
        return res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
    }

    /*
    await Medal.find({}, function (err, medal) {
        if (err) {
            return res.status(jsonMessages.db.noRecords).send(jsonMessages.db.noRecords);
        }
        else {
            Medal.find({}).select('');
            return res.send(medal);
        }
    });*/
};


// GET MEDAL BY ID
async function getMedalByID(req, res) {
    const _id = req.params.id;
    const error =`Cannot find medal with id '${_id}'.`;

    await Medal.findOne({ _id }, function (err, medal) {
        if (err) {
            return res.status(404).send({ error: error + err});
        }
        else {
            Medal.findOne({ _id }).select('');
            return res.send(medal);
        }
    });
};


// ADD NEW MEDAL
async function addMedal(req, res) {
    let newMedal = new Medal(req.body);
    const error = "Cannot add medal.";
    const msg = "New medal added.";

    newMedal.save(function (err, medal) {
        if (err) {
            return res.status(404).send({ error: error + err });
        }
        else {
            return res.status(200).send({ success: msg, medal: medal });
        }
    });
};


// REMOVE MEDAL BY ID
async function removeMedalByID(req, res) {
    const _id = req.params.id;
    const error = `Cannot remove medal. Cannot find medal with id '${_id}'.`;
    const msg = `Medal with id '${_id}' removed.`;

    if (await Medal.findOne({ _id })) {
        await Medal.findByIdAndDelete(_id, function (err) {
            if (err) {
                return res.status(404).send({ error: error + err });
            }
            else {
                return res.status(200).send({ success: msg });
            }
        });
    }
    else {
        return res.status(404).send({ error: error + err });
    }
};


// EXPORT ALL FUNCTIONS
module.exports = {
    getMedals,
    getMedalByID,
    addMedal,
    removeMedalByID
};
