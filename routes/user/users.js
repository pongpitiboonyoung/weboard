var express = require('express');
var router = express.Router();
const User = require('../../controller/user/user')

router.get('/test',User.insert)

module.exports = router