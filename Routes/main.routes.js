

const http = require("http");
const express = require("express");

const userController = require("../Controllers/user.controller.js");
const courseController = require("../Controllers/course.controller.js");
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
//.put("/user");


/* course */
router
    .get("/course", courseController.getCourses)
    .get("/course/:id", courseController.getCourseByID)
    .post("/course", courseController.addCourse)
    .delete("/course/:id", courseController.removeCourseByID);
//.put("/course");


/* unit */
/*router
    .get("/unit", unitController.getUnits)
    .get("/unit/:id", unitController.getUnitByID)
    .post("/unit", unitController.addUnit)
    .delete("/unit/:id", unitController.removeUnitByID);*/


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
    .delete("/level/:id", levelController.removeLevelByID);


    /* medal */
    router
        .get("/medal", medalController.getMedals)
        .get("/medal/:id", medalController.getMedalByID)
        .post("/medal", medalController.addMedal)
        .delete("/medal/:id", medalController.removeMedalByID);


module.exports = router;