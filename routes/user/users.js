var express = require('express');
var router = express.Router();
const User = require('../../controller/user/user')
const Auth = require('../../controller/auth/auth')

router.post('/register', User.register)
router.post('/login', User.login)
router.post('/profile', Auth.auth, User.profile)
router.post('/logout', Auth.auth, User.logout)
router.post('/edit_profile', Auth.auth, User.upload, User.edit_profile)
router.post('/edit_password', Auth.auth, User.edit_password)

module.exports = router