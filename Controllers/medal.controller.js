

const Medal = require("../Models/Medal.model.js");


// GET ALL MEDALS
async function getMedals(req, res) {
    const error = "Cannot get medals."

    await Medal.find({}, function (err, medal) {
        if (err) {
            return res.status(404).send({ error: error + err });
        }
        else {
            Medal.find({}).select('');
            return res.send(medal);
        }
    });
};


// GET MEDAL BY ID
async function getMedalByID(req, res) {
    const _id = req.params.id;

    await Medal.findOne({ _id }, function (err, medal) {
        const error =`Cannot find medal id '${_id}'.`;

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
    const error = "Cannot add medal."

    newMedal.save(function (err, medal) {
        if (err) {
            return res.status(404).send({ error: error + err });
        }
        else {
            return res.send(medal);
        }
    });
};


// REMOVE MEDAL BY ID
async function removeMedalByID(req, res) {
    const _id = req.params.id;
    const error = `Cannot remove medal. Cannot find medal with id '${_id}'.`;

    Medal.findByIdAndDelete(_id, function (err, medal) {

        if (err) {
            return res.status(404).send({ error: error +  err });
        }
        else {
            return res.send(medal);
        }
    });
};


// EXPORT ALL FUNCTIONS
module.exports = {
    getMedals,
    getMedalByID,
    addMedal,
    removeMedalByID
};
