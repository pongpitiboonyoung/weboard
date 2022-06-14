var express = require('express');
var router = express.Router();
const User = require('./users')

module.exports = async function (app) {
    app.use('/api/user',User)
};
