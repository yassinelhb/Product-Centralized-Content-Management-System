var express = require('express');
var router = express.Router();
const BlogService = require('../services/Blog.service');


router.post('/AddBlog', BlogService.addBlog);
module.exports = router;
