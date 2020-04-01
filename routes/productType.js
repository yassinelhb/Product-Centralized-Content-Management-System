const express = require('express');
const router = express.Router();
var ProductTypeService = require('../services/ProductType.service');



// get all Product Types
router.get('/', ProductTypeService.getAllTypes);

// create a new product type
router.post('/', ProductTypeService.create);

// get a type by id
router.get('/:typeId', ProductTypeService.getById);

// delete a product type
router.delete('/:typeId', ProductTypeService.delete);

// update a product type
router.put('/:typeId', ProductTypeService.update);

// create a new product type
router.post('/assignTypeToWebsite', ProductTypeService.assignTypeToWebsite);
// get a type by id
router.get('/getByWebsite/:websiteId', ProductTypeService.getByWebsite);
// get a type by id
router.get('/typesPagesByWebsite/:websiteId', ProductTypeService.getTypesPagesByWebsite);


module.exports = router;
