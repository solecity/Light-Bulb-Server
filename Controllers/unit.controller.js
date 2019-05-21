

const Unit = require("../Models/unit.model.js");


// GET ALL UNITS
async function getUnits(req, res) {
    const error = "Cannot get units."

    await Unit.find({}, function (err, unit) {
        if (err) {
            return res.status(404).send({ error: error + err });
        }
        else {
            Unit.find({}).select('');
            return res.send(unit);
        }
    });
};


// GET UNIT BY ID
async function getUnitByID(req, res) {
    const _id = req.params.id;

    await Unit.findOne({ _id }, function (err, unit) {
        const error =`Cannot find unit id '${_id}'.`;
        
        if (err) {
            return res.status(404).send({ error: error + err});
        }
        else {
            Unit.findOne({ _id }).select('');
            return res.send(unit);
        }
    });
};


// ADD NEW UNIT
async function addUnit(req, res) {
    let newUnit = new Unit(req.body);
    const error = "Cannot add unit."

    newUnit.save(function (err, unit) {
        if (err) {
            return res.status(404).send({ error: error + err });
        }
        else {
            return res.send(unit);
        }
    });
};


// REMOVE UNIT BY ID
async function removeUnitByID(req, res) {
    const _id = req.params.id;
    const error = `Cannot remove unit. Cannot find unit with id '${_id}'.`;
    
    Unit.findByIdAndDelete(_id, function (err, unit) {

        if (err) {
            return res.status(404).send({ error: error +  err });
        }
        else {
            return res.send(unit);
        }
    });
};


// EXPORT ALL FUNCTIONS
module.exports = {
    getUnits,
    getUnitByID,
    addUnit,
    removeUnitByID
};
