

const express = require('express');
const app = express();

const mainRoutes = require("./Routes/main.routes.js");

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(mainRoutes);

app.listen(3000, function () {
    console.log(`Server: `);
}); 