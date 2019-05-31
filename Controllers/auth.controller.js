const User = require("../Models/user.model.js");
const jsonMessages = require("../Assets/jsonMessages/db.js");
const bcrypt = require("bcrypt");


async function login(req, res) {
    const username = ??????? ;
    const password = ??????? ;
    let error = "";

    if (username == ???? ) {
        if (password == ????? ) {

        }
        else {
            error = "A password não está correta!";
        }
    }
    else {
        error = "O utilizador inserido não existe!";
    }
}