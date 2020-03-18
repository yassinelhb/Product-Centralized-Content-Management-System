const express = require('express');
const router = express.Router();
var SubTypeService = require('../services/ProductSubType.service');



// get all Sub-Types
router.get('/', SubTypeService.getAll);

// create a new sub-type
router.post('/', SubTypeService.create);

// get a sub-type by id
router.get('/:subTypeId', SubTypeService.getById);

// delete a sub-type
router.delete('/:subTypeId', SubTypeService.delete);

// update a sub-type
router.put('/:subTypeId', SubTypeService.update);

// assign a type to a sub-type
router.put('/:subTypeId', SubTypeService.assignType);

module.exports = router;