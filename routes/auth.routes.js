

const express = require("./node_modules/express");

const authController = require('../controllers/auth.controller.js');

var router = express.Router();


/* login */
router
    .get("/login", authController.login)
    .get("/logout", authController.logout);

module.exports = router;