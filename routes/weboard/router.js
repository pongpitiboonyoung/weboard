var express = require('express');
var router = express.Router();
const Webbaord = require('./webboard')

module.exports = async function (app) {
    app.use(Webbaord)
};
