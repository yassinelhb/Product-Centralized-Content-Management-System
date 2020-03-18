var express = require('express');
var router = express.Router();
const userService = require('../services/User.service');


router.get('/', ThemeService.getuser);
router.post('/register', ThemeService.register);
router.post('/', userService.login);
router.get('/testuser', userService.loginn);


module.exports = router;
