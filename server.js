

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

const mainRoutes = require("./routes/main.routes.js");

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(mainRoutes);

app.listen(port, function (port) {
    console.log("Server is running. Port: ", port);
}); 