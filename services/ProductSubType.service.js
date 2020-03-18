const SubType = require('../models/ProductSubType.model');

// get all Product Types
exports.getAll =   (req, res) =>{
    SubType.find()
              .then(subTypes => res.json(subTypes))
              .catch(err => res.status(400).json('Error: ' + err));

};

// create a new  sub-type
exports.create = async  (req, res) => {
    const subType = new SubType({
        name: req.body.name,
        description: req.body.description
    });
    try {
        const savedSubType = await subType.save();
        res.json(savedSubType);
    } catch (err) {
        res.json({message: err});
    }
};

// get a sub-type by id
exports.getById = async  (req, res) => {
    try {
        const type = await SubType.findById(req.params.subTypeId);
        res.json(type);
    } catch (err) {
        res.json({message: err});
    }
};

// delete a sub-type
exports.delete = async  (req, res) => {
    try {
        const removed = await SubType.remove({_id: req.params.subTypeId});
        res.json(removed);
    } catch (err) {
        res.json({message: err});
    }
};

// update a sub-type
exports.update = async  (req, res) => {
    try {
        const updated = await SubType.updateOne(
            { _id: req.params.subTypeId },
            { $set: { description: req.body.description }}
        );
        res.json(updated);
    } catch (err) {
        res.json({message: err});
    }
};
// assign a type to a sub-type
exports.assignType = async  (req, res) => {
    try {
        const updated = await SubType.updateOne(
            { _id: req.params.subTypeId },
            { $set: { productType: req.body.productType }}
        );
        res.json(updated);
    } catch (err) {
        res.json({message: err});
    }
};
