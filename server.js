

const express = require('express');
const app = express();
const userRoutes = require("./Routes/user.routes.js")
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(userRoutes);

app.listen(3000, function () {
    console.log('Server running at http://127.0.0.3000/');
}); 