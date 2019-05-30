

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
    .post("/user", userController.addUser)
    .delete("/user/:id", userController.removeUserByID);
//.put("/user/:id", userController.editUserByID);


/* question */
router
.get("/question", questionController.getQuestions)
.get("/question/:id", questionController.getQuestionByID)
.post("/question", questionController.addQuestion)
.delete("/question/:id", questionController.removeQuestionByID);
//.put("/question/:id", questionController.editQuestionByID);


/* course */
router
    .get("/course", courseController.getCourses)
    .get("/course/:id", courseController.getCourseByID)
    .post("/course", courseController.addCourse)
    .delete("/course/:id", courseController.removeCourseByID)
    .put("/course/:id", courseController.editCourseByID);


/* unit */
router
    .get("/unit", unitController.getUnits)
    .get("/unit/:id", unitController.getUnitByID)
    .get("/unit_details", unitController.getUnitsDetailInfo)
    .get("/unit/courses/:id", unitController.getCoursesByUnitID)
    .get("/unit/teacher/:id", unitController.getTeacherByUnitID)
    .post("/unit", unitController.addUnit)
    .delete("/unit/:id", unitController.removeUnitByID)
    .put("/unit/:id", unitController.editUnitByID);


/* tag */
router
    .get("/tag", tagController.getTags)
    .get("/tag/:id", tagController.getTagByID)
    .post("/tag", tagController.addTag)
    .delete("/tag/:id", tagController.removeTagByID);


/* level */
router
    .get("/level", levelController.getLevels)
    .get("/level/:id", levelController.getLevelByID)
    .post("/level", levelController.addLevel)
    .delete("/level/:id", levelController.removeLevelByID)
    .put("/level/:id", levelController.editLevelByID);


/* medal */
router
    .get("/medal", medalController.getMedals)
    .get("/medal/:id", medalController.getMedalByID)
    .post("/medal", medalController.addMedal)
    .delete("/medal/:id", medalController.removeMedalByID);
    //.put("/medal/:id", medalController.editMedalByID);


module.exports = router;