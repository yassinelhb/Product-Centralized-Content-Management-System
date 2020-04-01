const SubType = require('../models/ProductSubType.model');
const Page = require('../models/page.model');

// get all Product sub-Types
exports.getAll =   (req, res) =>{
    SubType.find().populate('productType').exec()
              .then(subTypes => res.json(subTypes))
              .catch(err => res.status(400).json('Error: ' + err));

};
// get all Product sub-Types
exports.getByType =   (req, res) =>{
    SubType.find({productType:req.params.typeId}).populate('productType').exec()
        .then(subTypes => res.json(subTypes))
        .catch(err => res.status(400).json('Error: ' + err));

};
// create a new  sub-type
exports.create = async  (req, res) => {
    const subType = new SubType({
        name: req.body.name,
        description: req.body.description,
        productType:req.body.productType
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
        const type = await SubType.findById(req.params.subTypeId).populate('productType').exec();
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
            { $set: req.body}
        ,
        {new: true, useFindAndModify: false}
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
// get  Product Sub Types pages by website
exports.getPagesByWebsite =   (req, res) =>{
    Page.find({website:req.params.websiteId,type:"subCategory"}).populate('productTypePage').exec()
        .then(pages => {

            res.json(pages);


        })
        .catch(err => res.status(400).json('Error: ' + err));

};



// get  Product Types pages by website
exports.getSubTypesPagesByType =   (req, res) =>{
    Page.find({ "productTypePage" :req.params.typeId })
        .then(pages => {

            res.json(pages);

        })
        .catch(err => res.status(400).json('Error: ' + err));

};
