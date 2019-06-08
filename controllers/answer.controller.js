

const Question = require("../models/question.model.js");
const User = require("../models/user.model.js");
const jsonMessages = require("../jsonMessages/db.js");


// GET ALL ANSWERS BY QUESTION ID
async function getAnswersByQuestion(req, res) {
    const _id = req.params.id;

    try {
        const questionID = await Question.findOne({ _id });

        if (questionID) {
            const count = await Answer.countDocuments();
            const search = await Answer.find({ question: _id });
    
            if (count === 0) {
                return res.status(jsonMessages.notFound.noRecords.status).send(jsonMessages.notFound.noRecords);
            }
            else {
                return res.send(search);
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


// GET ALL ANSWERS BY USER ID
async function getAnswers(req, res) {
    const _id = req.params.id;

    try {
        const search = await Question.findOne({ _id });

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


// GET ANSWER DETAIL INFO BY ID
async function getAnswerDetailsByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Question.findOne({ _id }).lean();
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


// GET ANSWER DETAILS BY OBJECT ID
async function getDetailsByID(question) {
    const courses = await Course.find().lean();
    const units = await Unit.find().lean();
    const tags = await Tag.find().lean();
    const users = await User.find().lean();
    let matchingTags = [];

    courses.forEach(course => {
        if (course._id.equals(question.course)) {
            question.course = course.course;
        }
    });

    units.forEach(unit => {
        if (unit._id.equals(question.unit)) {
            question.unit = unit.unit;
        }
    });

    question.tags.forEach(questionTag => {
        tags.forEach(tag => {
            if (tag._id.equals(questionTag)) {
                matchingTags.push(tag.tag);
            }
        });
    });
    question.tags = matchingTags;

    users.forEach(user => {
        if (user._id.equals(question.user)) {
            question.user = user.name;
        }
    })

    return question;
}


// CREATE NEW ANSWER
async function createAnswer(req, res) {
    let newQuestion = new Question(req.body);

    try {
        const result = newQuestion.save();

        if (result) {
            return res.status(jsonMessages.success.successInsert.status).send({ msg: jsonMessages.success.successInsert, data: newQuestion });
        }
        else {
            return res.status(jsonMessages.error.errorInsert.status).send(jsonMessages.error.errorInsert);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// DELETE QUESTION BY ID
async function deleteAnswerByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Question.findOne({ _id });
        const result = await Question.findByIdAndDelete({ _id });

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


// UPDATE ANSWER BY ID
async function updateAnswerByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Question.findOne({ _id });
        const result = await Question.findByIdAndUpdate(_id, req.body);

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
    getAnswersByQuestion,
    getAnswersDetails,
    getAnswerByID,
    getAnswerDetailsByID,
    createAnswer,
    deleteAnswerByID,
    updateAnswerByID
};
