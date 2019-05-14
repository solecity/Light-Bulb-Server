

const http = require("http");
const express = require("express");

const userController = require("../Controllers/user.controller.js");

var router = express.Router();

router
    .get("/user", userController.getUsers)
    .get("/user/:id", userController.getUserByID)
    .post("/user", userController.addUser)
    //.put("/user");


module.exports = router;