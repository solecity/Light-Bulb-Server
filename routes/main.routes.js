

//const http = require("http");
const express = require("express");

const userController = require("../controllers/user.controller.js");
const courseController = require("../controllers/course.controller.js");
const unitController = require("../controllers/unit.controller.js");
const questionController = require("../controllers/question.controller.js");
const tagController = require("../controllers/tag.controller.js");
const levelController = require("../controllers/level.controller.js");
const medalController = require("../controllers/medal.controller.js");

var router = express.Router();

/* user */
router
    .get("/user", userController.getUsers)
    .get("/user/basic", userController.getUsersBasicInfo)
    .get("/user/:id", userController.getUserByID)
    .post("/user", userController.createUser)
    .delete("/user/:id", userController.deleteUserByID);
//.put("/user/:id", userController.updateUserByID);


/* question */
router
    .get("/question", questionController.getQuestions)
    .get("/question/details", questionController.getQuestionsDetails)
    .get("/question/:id", questionController.getQuestionByID)
    .get("/question/details/:id", questionController.getQuestionDetailsByID)
    .get("/question/answers/:id", questionController.getAnswersByQuestionID)
    .post("/question", questionController.createQuestion)
    .delete("/question/:id", questionController.deleteQuestionByID)
    .put("/question/:id", questionController.updateQuestionByID);


/* course */
router
    .get("/course", courseController.getCourses)
    .get("/course/details", courseController.getCoursesDetails)
    .get("/course/:id", courseController.getCourseByID)
    .get("/course/details/:id", courseController.getCourseDetailsByID)
    .post("/course", courseController.createCourse)
    .delete("/course/:id", courseController.deleteCourseByID)
    .put("/course/:id", courseController.updateCourseByID);


/* unit */
router
    .get("/unit", unitController.getUnits)
    .get("/unit/details", unitController.getUnitsDetails)
    .get("/unit/:id", unitController.getUnitByID)
    .get("/unit/details/:id", unitController.getUnitDetailsByID)
    .post("/unit", unitController.createUnit)
    .delete("/unit/:id", unitController.deleteUnitByID)
    .put("/unit/:id", unitController.updateUnitByID);


/* tag */
router
    .get("/tag", tagController.getTags)
    .get("/tag/:id", tagController.getTagByID)
    .post("/tag", tagController.createTag)
    .delete("/tag/:id", tagController.deleteTagByID);


/* level */
router
    .get("/level", levelController.getLevels)
    .get("/level/:id", levelController.getLevelByID)
    .post("/level", levelController.createLevel)
    .delete("/level/:id", levelController.deleteLevelByID)
    .put("/level/:id", levelController.updateLevelByID);


/* medal */
router
    .get("/medal", medalController.getMedals)
    .get("/medal/:id", medalController.getMedalByID)
    .post("/medal", medalController.createMedal)
    .delete("/medal/:id", medalController.deleteMedalByID);
    //.put("/medal/:id", medalController.updateMedalByID);


module.exports = router;