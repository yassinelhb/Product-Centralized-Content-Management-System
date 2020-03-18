const ProductType = require('../models/ProductType.model');

// get all Product Types
exports.getAllTypes =   (req, res) =>{
   ProductType.find()
              .then(productTypes => res.json(productTypes))
              .catch(err => res.status(400).json('Error: ' + err));

};

// create a new product type
exports.create = async  (req, res) => {
    const type = new ProductType({
        name: req.body.name,
        description: req.body.description
    });
    try {
        const savedProductType = await type.save();
        res.json(savedProductType);
    } catch (err) {
        res.json({message: err});
    }
};

// get a type by id
exports.getById = async  (req, res) => {
    try {
        const type = await ProductType.findById(req.params.typeId);
        res.json(type);
    } catch (err) {
        res.json({message: err});
    }
};

// delete a product type
exports.delete = async  (req, res) => {
    try {
        const removed = await ProductType.remove({_id: req.params.typeId});
        res.json(removed);
    } catch (err) {
        res.json({message: err});
    }
};

// update a product type
exports.update = async  (req, res) => {
    try {
        const updated = await ProductType.updateOne(
            { _id: req.params.typeId },
            { $set: { description: req.body.description }}
        );
        res.json(updated);
    } catch (err) {
        res.json({message: err});
    }
};
