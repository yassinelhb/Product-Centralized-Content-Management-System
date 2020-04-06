const Product = require('../models/Product.model');

// get all Detail
exports.getAll =   (req, res) =>{

    Product.find()
              .then(products => res.json(products))
              .catch(err => res.status(400).json('Error: ' + err));

};

// create a new product
exports.create = async  (req, res) => {

    try {
        const saved = await Product.create(req.body);
        res.json(saved);
    } catch (err) {
        res.json({message: err});
    }
};

// get a product by id
exports.getById = async  (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.json(property);
    } catch (err) {
        res.json({message: err});
    }
};

// delete a product
exports.delete = async  (req, res) => {
    try {
        const removed = await Product.remove({_id: req.params.productId});
        res.json(removed);
    } catch (err) {
        res.json({message: err});
    }
};

// update a product
exports.update = async  (req, res) => {
    try {
        const updated = await Product.updateOne(
            { _id: req.params.productId },
            { $set: req.body}
            ,
            {new: true, useFindAndModify: false}
        );
        res.json(updated);
    } catch (err) {
        res.json({message: err});
    }
};

