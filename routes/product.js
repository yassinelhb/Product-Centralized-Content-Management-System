const express = require('express');
const router = express.Router();
var ProductService = require('../services/Product.service');



// get all products
router.get('/', ProductService.getAll);

// create a new product
router.post('/', ProductService.create);

// get a product by id
router.get('/:productId', ProductService.getById);

// delete a product
router.delete('/:productId', ProductService.delete);

// update a product
router.put('/:propertyId', ProductService.update);

module.exports = router;
