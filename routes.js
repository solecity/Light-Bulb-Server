
const http = require("http");
const express = require("express");
const app = express();

const user = require('user.controller');

app.route("/user").get(function (req, res) {
    res.send("Get user");
});

app.route("/user").post(function (req, res) {
    res.send("Add user");
});

app.route("/user").put(function (req, res) {
    res.send("Update user");
});