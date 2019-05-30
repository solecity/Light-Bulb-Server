

const Unit = require("../Models/unit.model.js");
const Course = require("../Models/course.model.js");
const User = require("../Models/user.model.js");
const jsonMessages = require("../Assets/jsonMessages/bd.js");


// GET ALL UNITS
async function getUnits(req, res) {
    const count = await Unit.countDocuments();
    const result = await Unit.find();

    try {
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


// GET UNIT BY ID
async function getUnitByID(req, res) {
    const _id = req.params.id;

    try {
        const result = await Unit.findOne({ _id });

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


// GET UNITS DETAIL INFO
async function getUnitsDetailInfo(req, res) {
    const count = await Unit.countDocuments();

    try {
        if (count === 0) {
            return res.status(jsonMessages.notFound.noRecords.status).send(jsonMessages.notFound.noRecords);
        }
        else {
            const result = await getDetails();

            return res.send(result);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};

async function getDetails() {
    const units = await Unit.find().lean();
    const courses = await Course.find().lean();
    
    units.forEach(unit => {
        let matchingCourses = [];

        unit.courses.forEach(unitCourse => {
            courses.forEach(course => {
                if (course._id.equals(unitCourse)) {
                    matchingCourses.push({ course });
                }
            });
        });
        unit.courses = matchingCourses;
    });

    return units;
}


// GET COURSES BY UNIT ID
async function getCoursesByUnitID(req, res) {
    const _id = req.params.id;
    const units = await Unit.find({ _id }).lean();
    const courses = await Course.find().lean();

    units.forEach(unit => {
        let matchingCourses = [];

        unit.courses.forEach(unitCourse => {
            courses.forEach(course => {
                if (course._id.equals(unitCourse)) {
                    matchingCourses.push({ course });
                }
            });
        });
        unit.courses = matchingCourses;
    });
    res.send(units);
};


// GET TEACHER BY UNIT ID
async function getTeacherByUnitID(req, res) {
    const _id = req.params.id;
    const units = await Unit.find({ _id }).lean();
    const users = await User.find().lean();

    units.forEach(unit => {
        users.forEach(user => {
            if (user._id.equals(user.teacher)) {
                res.send(user);
            }
        });
    });
};


// ADD NEW UNIT
async function addUnit(req, res) {
    const _unit = req.body.unit;
    let newUnit = new Unit(req.body);

    try {
        const search = await Unit.findOne({ "unit": _unit });
        const result = newUnit.save();

        if (search) {
            return res.status(jsonMessages.error.duplicateData.status).send(jsonMessages.error.duplicateData);
        }
        else {
            if (result) {
                return res.status(jsonMessages.success.successInsert.status).send({ msg: jsonMessages.success.successInsert, data: newUnit });
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


// REMOVE UNIT BY ID
async function removeUnitByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Unit.findOne({ _id });
        const result = await Unit.findByIdAndDelete({ _id });

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

// EDIT UNIT BY ID
async function editUnitByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Unit.findOne({ _id });
        const result = await Unit.findByIdAndUpdate(_id, req.body);

        if (search) {
            if (result) {
                return res.status(jsonMessages.success.successEdit.status).send(jsonMessages.success.successEdit);
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
    getUnits,
    getUnitByID,
    getUnitsDetailInfo,
    getCoursesByUnitID,
    getTeacherByUnitID,
    addUnit,
    removeUnitByID,
    editUnitByID
};
