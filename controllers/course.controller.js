

const Course = require("../models/course.model.js");
const Unit = require("../models/unit.model.js");
const User = require("../models/user.model.js");
const jsonMessages = require("../jsonMessages/db.js");


// GET ALL COURSES
async function getCourses(req, res) {
    try {
        const count = await Course.countDocuments();
        const search = await Course.find();

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


// GET ALL COURSES DETAIL INFO
async function getCoursesDetails(req, res) {
    try {
        const count = await Course.countDocuments();

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
    const courses = await Course.find().lean();
    const units = await Unit.find().lean();
    const users = await User.find().lean();

    courses.forEach(course => {
        let matchingUnits = [];
        
        course.units.forEach(courseUnit => {
            units.forEach(unit => {
                if (unit._id.equals(courseUnit)) {
                    let tempUnit = {
                        unit: unit.unit,
                        year: unit.year,
                        teacher: unit.teacher,
                        description: unit.description
                    }

                    users.forEach(user => {
                        if (user._id.equals(unit.teacher)) {
                            tempUnit.teacher = user.name;
                        }
                    })

                    matchingUnits.push(tempUnit);
                }
            });
        });
        course.units = matchingUnits;

        users.forEach(user => {
            if (user._id.equals(course.coordinator)) {
                course.coordinator = user.name;
            }
        })
    });

    return courses;
}


// GET COURSE BY ID
async function getCourseByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Course.findOne({ _id });

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


// GET COURSE DETAIL INFO BY ID
async function getCourseDetailsByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Course.findOne({ _id }).lean();
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


// GET COURSE DETAILS BY OBJECT ID
async function getDetailsByID(course) {
    const units = await Unit.find().lean();
    const users = await User.find().lean();
    let matchingUnits = [];


    course.units.forEach(courseUnit => {
        units.forEach(unit => {
            if (unit._id.equals(courseUnit)) {
                let tempUnit = {
                    unit: unit.unit,
                    year: unit.year,
                    teacher: unit.teacher,
                    description: unit.description
                }

                users.forEach(user => {
                    if (user._id.equals(unit.teacher)) {
                        tempUnit.teacher = user.name;
                    }
                })

                matchingUnits.push(tempUnit);
            }
        });
    });
    course.units = matchingUnits;

    users.forEach(user => {
        if (user._id.equals(course.coordinator)) {
            course.coordinator = user.name;
        }
    })

    return course;
}


// CREATE NEW COURSE
async function createCourse(req, res) {
    const _course = req.body.course;
    const _level = req.body.level;
    let newCourse = new Course(req.body);

    try {
        const searchCourse = await Course.findOne({ "course": _course });
        const searchLevel = await Course.findOne({ "level": _level });
        const result = newCourse.save();

        if (searchCourse && searchLevel) {
            return res.status(jsonMessages.error.duplicateData.status).send(jsonMessages.error.duplicateData);
        }
        else {
            if (result) {
                return res.status(jsonMessages.success.successInsert.status).send({ msg: jsonMessages.success.successInsert, data: newCourse });
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


// DELETE COURSE BY ID
async function deleteCourseByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Course.findOne({ _id });
        const result = await Course.findByIdAndDelete({ _id });

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


// UPDATE COURSE BY ID
async function updateCourseByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Course.findOne({ _id });
        const result = await Course.findByIdAndUpdate(_id, req.body);

        if (search) {
            if (result) {
                return res.status(jsonMessages.success.successUpdate.status).send(jsonMessages.success.successUpdate);
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
    getCourses,
    getCoursesDetails,
    getCourseByID,
    getCourseDetailsByID,
    createCourse,
    deleteCourseByID,
    updateCourseByID
};
