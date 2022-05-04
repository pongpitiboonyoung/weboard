var express = require('express');
var router = express.Router();
const User = require('../../controller/user/user')

router.post('/register',User.register)
router.post('/login',User.login)
router.post('/profile',User.auth,User.profile)
router.post('/logout',User.auth,User.logout)
router.post('/edit_profile',User.auth,User.upload,User.edit_profile)
router.post('/edit_password',User.auth,User.edit_password)

module.exports = router