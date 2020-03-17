const express = require('express');
const router = express.Router();

const WebsiteService = require('../services/website.service');



// get back all the websites
router.get('/', WebsiteService.getWebsites);

// submit a website
router.post('/', WebsiteService.addWebsite);

// specific website
router.get('/:siteId', WebsiteService.getOneWebsite)

// delete website
router.delete('/:siteId', WebsiteService.deleteWebsite)

// update a website
router.patch('/:siteId', WebsiteService.updateWebsite)

// update links of header
router.post('/header/link/:type', WebsiteService.updateLinksHeader)

module.exports = router;
