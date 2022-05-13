var express = require('express');
var router = express.Router();
const Webbaord = require('../../controller/weboard/webboard')

router.post('/webboard',Webbaord.webboard)

module.exports = router