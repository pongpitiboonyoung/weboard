var express = require('express');
var router = express.Router();
const Like = require('../../controller/post/like')
const Auth = require('../../controller/auth/auth')

router.post('/like',Auth.auth,Like.like_add)


module.exports = router