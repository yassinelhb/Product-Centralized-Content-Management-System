const express = require('express');
const router = express.Router();
var ProductService = require('../services/Product.service');



// get all products
router.get('/', ProductService.getAll);
// get all products by country
router.get('/findByCountry/:country', ProductService.findByCountry);
// get all products  by website
router.get('/findByWebsite/:websiteId', ProductService.findByWebsite);
// get all products pages by website
router.get('/getPagesByWebsite/:websiteId', ProductService.getPagesByWebsite);
// create a new product
router.post('/:websiteId', ProductService.create);
// assign To Website
router.post('/assignToWebsite/:websiteId', ProductService.assignToWebsite);
// get a product by id
router.get('/getPicture/:picture', ProductService.getPicture);
// get a product by id
router.get('/:productId', ProductService.getById);

// delete a product
router.delete('/:productId', ProductService.delete);
// delete a product from a website
router.delete('/removeFromWebsite/:websiteId/:productId', ProductService.removeFromWebsite);
// update a product
router.put('/:propertyId', ProductService.update);

module.exports = router;
