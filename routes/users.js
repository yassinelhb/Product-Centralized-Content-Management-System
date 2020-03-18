var express = require('express');
var router = express.Router();
const userService = require('../services/User.service');


router.get('/', userService.getuser);
router.post('/register', userService.register);
router.post('/', userService.login);
//test
router.get('/testuser', userService.loginn);


module.exports = router;
