const express = require('express');
const router = express.Router();
const LayoutService = require('../services/layout.service')

// get all layout
router.get('/:siteId', LayoutService.getLayout)

module.exports = router;
