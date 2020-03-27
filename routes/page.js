const express = require('express');
const router = express.Router();
const PageService = require('../services/page.service')

// get all page
router.get('/:siteId', PageService.getPages)

// add page
router.post('/', PageService.addPage)

// update page
router.patch('/', PageService.updatePage)

// delete page
router.delete('/:pageId', PageService.deletePage)

module.exports = router;