const express = require('express');
const router = express.Router();
const PageService = require('../services/page.service')

// get all page
router.get('/', PageService.getPages)

// get page by id
router.get('/:pageId', PageService.getOnePage)

// add page
router.post('/:siteId', PageService.addPage)

// update page
router.patch('/:siteId', PageService.updatePage)

// delete page
router.delete('/:pageId', PageService.deletePage)

module.exports = router;
