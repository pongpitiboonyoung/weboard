var express = require('express');
var router = express.Router();
const Post = require('./post')

module.exports = async function (app) {
    app.use('/api/post',Post)
};
