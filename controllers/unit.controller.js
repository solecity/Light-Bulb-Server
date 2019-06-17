

const Unit = require("../models/unit.model.js");
const Course = require("../models/course.model.js");
const User = require("../models/user.model.js");
const jsonMessages = require("../jsonMessages/db.js");


// GET ALL UNITS WITH DETAIL INFO
async function getUnits(req, res) {
    try {
        const count = await Unit.countDocuments();

        if (count === 0) {
            return res.status(jsonMessages.notFound.noRecords.status).send(jsonMessages.notFound.noRecords);
        }
        else {
            const search = await getDetails();

            return res.send(search);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// GET UNIT DETAILS BY OBJECT ID
async function getDetails() {
    const units = await Unit.find().lean();
    const courses = await Course.find().lean();
    const users = await User.find().lean();

    units.forEach(unit => {
        let matchingCourses = [];

        unit.courses.forEach(unitCourse => {
            courses.forEach(course => {
                if (course._id.equals(unitCourse)) {
                    let tempCourse = {
                        id: course._id,
                        course: course.course,
                        level: course.level,
                        coordinator: course.coordinator
                    }

                    users.forEach(user => {
                        if (user._id.equals(course.coordinator)) {
                            tempCourse.coordinator = user.name;
                        }
                    })

                    matchingCourses.push(tempCourse);
                }
            });
        });
        unit.courses = matchingCourses;

        users.forEach(user => {
            if (user._id.equals(unit.teacher)) {
                unit.teacher = user.name;
            }
        })
    });

    return units;
}


// GET UNIT WITH DETAIL INFO BY ID
async function getUnitByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Unit.findOne({ _id }).lean();
        const result = await getDetailsByID(search);

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


// GET DETAILS BY UNIT OBJECT ID
async function getDetailsByID(unit) {
    const courses = await Course.find().lean();
    const users = await User.find().lean();
    let matchingCourses = [];

    unit.courses.forEach(unitCourse => {
        courses.forEach(course => {
            if (course._id.equals(unitCourse)) {
                let tempCourse = {
                    id: course._id,
                    course: course.course,
                    level: course.level,
                    coordinator: ""
                }

                users.forEach(user => {
                    if (user._id.equals(course.coordinator)) {
                        tempCourse.coordinator = user.name;
                    }
                })

                matchingCourses.push(tempCourse);
            }
        });
    });
    unit.courses = matchingCourses;

    users.forEach(user => {
        if (user._id.equals(unit.teacher)) {
            unit.teacher = user.name;
        }
    })

    return unit;
}


// CREATE NEW UNIT
async function createUnit(req, res) {
    const _unit = req.body.unit;
    let newUnit = new Unit(req.body);

    try {
        if (req.body.unit && req.body.teacher && req.body.year && req.body.courses) {
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
        else {
            return res.status(jsonMessages.error.requiredData.status).send(jsonMessages.error.requiredData);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// DELETE UNIT BY ID
async function deleteUnitByID(req, res) {
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


// UPDATE UNIT BY ID
async function updateUnitByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Unit.findOne({ _id });
        const result = await Unit.findByIdAndUpdate(_id, req.body, { new: true });

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
    getUnits,
    getUnitByID,
    createUnit,
    deleteUnitByID,
    updateUnitByID
};
