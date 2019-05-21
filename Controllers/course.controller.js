

const Course = require("../Models/course.model.js");


// GET ALL COURSES
async function getCourses(req, res) {
    const error = "Cannot get courses."

    await Course.find({}, function (err, course) {
        if (err) {
            return res.status(404).send({ error: error + err });
        }
        else {
            Course.find({}).select('');
            return res.send(course);
        }
    });
};


// GET COURSE BY ID
async function getCourseByID(req, res) {
    const _id = req.params.id;

    await Course.findOne({ _id }, function (err, course) {
        const error =`Cannot find course id '${_id}'.`;

        if (err) {
            return res.status(404).send({ error: error + err});
        }
        else {
            Course.findOne({ _id }).select('');
            return res.send(course);
        }
    });
};


// ADD NEW COURSE
async function addCourse(req, res) {
    let newCourse = new Course(req.body);
    const error = "Cannot add course."

    newCourse.save(function (err, course) {
        if (err) {
            return res.status(404).send({ error: error + err });
        }
        else {
            return res.send(course);
        }
    });
};


// REMOVE COURSE BY ID
async function removeCourseByID(req, res) {
    const _id = req.params.id;
    const error = `Cannot remove course. Cannot find course with id '${_id}'.`;
    
    Course.findByIdAndDelete(_id, function (err, course) {

        if (err) {
            return res.status(404).send({ error: error + err });
        }
        else {
            return res.send(course);
        }
    });
};


// EXPORT ALL FUNCTIONS
module.exports = {
    getCourses,
    getCourseByID,
    addCourse,
    removeCourseByID
};
