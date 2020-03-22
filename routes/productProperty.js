const express = require('express');
const router = express.Router();
var PropertyService = require('../services/ProductProperty.service');



// get all property
router.get('/', PropertyService.getAll);

// create a new property
router.post('/', PropertyService.create);

// get a property by id
router.get('/:propertyId', PropertyService.getById);

// delete a property
router.delete('/:propertyId', PropertyService.delete);

// update a property
router.put('/:propertyId', PropertyService.update);
// assign a sub-type to a product property
router.put('/assignSubType/:propertyId', PropertyService.assignSubType);
module.exports = router;
