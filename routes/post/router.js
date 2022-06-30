var express = require('express');
var router = express.Router();
const Post = require('./post')
const Like = require('./like')

module.exports = async function (app) {
    app.use('/api/post',Post)
    app.use('/api/post',Like)
};
