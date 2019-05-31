

const Course = require("../Models/course.model.js");
const jsonMessages = require("../assets/jsonMessages/db.js");


// GET ALL COURSES
async function getCourses(req, res) {
    const count = await Course.countDocuments();
    const result = await Course.find();

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


// GET COURSE BY ID
async function getCourseByID(req, res) {
    const _id = req.params.id;

    try {
        const result = await Course.findOne({ _id });

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


// CREATE NEW COURSE
async function createCourse(req, res) {
    const _course = req.body.course;
    let newCourse = new Course(req.body);

    try {
        const search = await Course.findOne({ "course": _course });
        const result = newCourse.save();

        if (search) {
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
    getCourses,
    getCourseByID,
    createCourse,
    deleteCourseByID,
    updateCourseByID
};
