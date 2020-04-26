var express = require('express');
var router = express.Router();
const BlogService = require('../services/Blog.service');

router.put('/:id',BlogService.updateBlog);
router.put('/validation/:id',BlogService.validationBlog);

router.post('/AddBlog', BlogService.addBlog);
router.get('/', BlogService.getBlog);
router.get('/test:id', BlogService.getByUser);

module.exports = router;
