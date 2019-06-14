

const Question = require("../models/question.model.js");
const Course = require("../models/course.model.js");
const Unit = require("../models/unit.model.js");
const Tag = require("../models/tag.model.js");
const User = require("../models/user.model.js");
const jsonMessages = require("../jsonMessages/db.js");


// GET ALL QUESTIONS
async function getQuestions(req, res) {
    try {
        const count = await Question.countDocuments();
        const search = await Question.find();

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


// GET ALL QUESTIONS DETAIL INFO
async function getQuestionsDetails(req, res) {
    try {
        const count = await Question.countDocuments();

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


// GET QUESTIONS DETAILS BY OBJECT ID
async function getDetails() {
    const questions = await Question.find().lean();
    const courses = await Course.find().lean();
    const units = await Unit.find().lean();
    const tags = await Tag.find().lean();
    const users = await User.find().lean();

    questions.forEach(question => {
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
    });

    return questions;
}


// GET QUESTION BY ID
async function getQuestionByID(req, res) {
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


// GET QUESTION DETAIL INFO BY ID
async function getQuestionDetailsByID(req, res) {
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


// GET QUESTION DETAILS BY OBJECT ID
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

    question.answers.forEach(questionAnswer => {
        users.forEach(user => {
            if (user._id.equals(questionAnswer.user)) {
                questionAnswer.user = user.name;
            }
        });
    });

    return question;
}


// GET ALL QUESTIONS BY USER ID
async function getQuestionsByUserID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Question.find({ user: _id });

        if (search) {
            return res.send({user: _id, question: search });
        }
        else {
            return res.status(jsonMessages.notFound.noRecordsId.status).send(jsonMessages.notFound.noRecordsId);
        }
    }
    catch (err) {
        return res.status(jsonMessages.error.dbError.status).send(jsonMessages.error.dbError);
    }
};


// GET ALL ANSWERS BY QUESTION ID
async function getAnswersByQuestionID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Question.findOne({ _id });

        if (search) {
            if (search.answers.length === 0) {
                return res.status(jsonMessages.notFound.noRecords.status).send(jsonMessages.notFound.noRecords);
            }
            else {
                return res.send({question: search, answers: search.answers });
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


// CREATE NEW QUESTION
async function createQuestion(req, res) {
    let newQuestion = new Question(req.body);

    try {
        const result = newQuestion.save();

        console.log(result)

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
async function deleteQuestionByID(req, res) {
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


// UPDATE COURSE BY ID
async function updateQuestionByID(req, res) {
    const _id = req.params.id;

    try {
        const search = await Question.findOne({ _id });
        const result = await Question.findByIdAndUpdate(_id, req.body);

        console.log(req.body)

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
    getQuestions,
    getQuestionsDetails,
    getQuestionByID,
    getQuestionDetailsByID,
    getQuestionsByUserID,
    getAnswersByQuestionID,
    createQuestion,
    deleteQuestionByID,
    updateQuestionByID
};
