

const Question = require("../models/question.model.js");
const jsonMessages = require("../assets/jsonMessages/db.js");


// GET ALL QUESTIONS
async function getQuestions(req, res) {
    const error = "Cannot get questions."

    await Question.find({}, function (err, question) {
        if (err) {
            return res.status(404).send({ error: error + err });
        }
        else {
            Question.find({}).select('');
            return res.send(question);
        }
    });
};


// GET QUESTION BY ID
async function getQuestionByID(req, res) {
    const _id = req.params.id;

    await Question.findOne({ _id }, function (err, question) {
        const error =`Cannot find question id '${_id}'.`;

        if (err) {
            return res.status(404).send({ error: error + err});
        }
        else {
            Question.findOne({ _id }).select('');
            return res.send(question);
        }
    });
};


// CREATE NEW QUESTION
async function createQuestion(req, res) {
    let newQuestion = new Question(req.body);
    const error = "Cannot add question."

    newQuestion.save(function (err, question) {
        if (err) {
            return res.status(404).send({ error: error + err });
        }
        else {
            return res.send(question);
        }
    });
};


// DELETE QUESTION BY ID
async function deleteQuestionByID(req, res) {
    const _id = req.params.id;
    const error = `Cannot remove question. Cannot find question with id '${_id}'.`;

    Question.findByIdAndDelete(_id, function (err, question) {

        if (err) {
            return res.status(404).send({ error: error +  err });
        }
        else {
            return res.send(question);
        }
    });
};


// EXPORT ALL FUNCTIONS
module.exports = {
    getQuestions,
    getQuestionByID,
    createQuestion,
    deleteQuestionByID
};
