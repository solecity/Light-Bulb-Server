

//const http = require("http");
const express = require("express");

const userController = require("../Controllers/user.controller.js");
const courseController = require("../Controllers/course.controller.js");
const unitController = require("../Controllers/unit.controller.js");
const questionController = require("../Controllers/question.controller.js");
const tagController = require("../Controllers/tag.controller.js");
const levelController = require("../Controllers/level.controller.js");
const medalController = require("../Controllers/medal.controller.js");

var router = express.Router();

/* user */
router
    .get("/user", userController.getUsers)
    .get("/user/:id", userController.getUserByID)
    .post("/user", userController.createUser)
    .delete("/user/:id", userController.deleteUserByID);
//.put("/user/:id", userController.updateUserByID);


/* question */
router
.get("/question", questionController.getQuestions)
.get("/question/:id", questionController.getQuestionByID)
.post("/question", questionController.createQuestion)
.delete("/question/:id", questionController.deleteQuestionByID);
//.put("/question/:id", questionController.updateQuestionByID);


/* course */
router
    .get("/course", courseController.getCourses)
    .get("/course/:id", courseController.getCourseByID)
    .post("/course", courseController.createCourse)
    .delete("/course/:id", courseController.deleteCourseByID)
    .put("/course/:id", courseController.updateCourseByID);


/* unit */
router
    .get("/unit", unitController.getUnits)
    .get("/unit/:id", unitController.getUnitByID)
    .get("/unit_details", unitController.getUnitsDetailInfo)
    .get("/unit/courses/:id", unitController.getCoursesByUnitID)
    .get("/unit/teacher/:id", unitController.getTeacherByUnitID)
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