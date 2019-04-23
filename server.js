const express = require('express');
const app = express();

app.listen(3000, function () {
    console.log('Server running at http://127.0.0.3000/');
});

require('loader.js');
require('routes.js');