

const Question = require("../models/question.model.js");
const jsonMessages = require("../assets/jsonMessages/db.js");


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


// CREATE NEW QUESTION
async function createQuestion(req, res) {
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


// EXPORT ALL FUNCTIONS
module.exports = {
    getQuestions,
    getQuestionByID,
    createQuestion,
    deleteQuestionByID
};
