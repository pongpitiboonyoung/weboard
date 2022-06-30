var express = require('express');
var router = express.Router();
const Post = require('../../controller/post/post')
const Auth = require('../../controller/auth/auth')

router.post('/add',Auth.auth,Post.post_add)
router.post('/edit',Auth.auth,Post.post_edit)
router.post('/delete',Auth.auth,Post.post_delete)
router.post('/post_list',Auth.auth,Post.get_post_list)
router.post('/get_post',Auth.auth,Post.get_post)

module.exports = router