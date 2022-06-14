var express = require('express');
var router = express.Router();
const Post = require('../../controller/post/post')
const Auth = require('../../controller/auth/auth')

router.post('/add',Auth.auth,Post.post_add)
router.post('/edit',Auth.auth,Post.post_add)
router.post('/delete',Auth.auth,Post.post_add)

module.exports = router