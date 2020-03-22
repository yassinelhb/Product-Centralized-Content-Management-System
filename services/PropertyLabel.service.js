const Label = require('../models/PropertyLabel.model');

// get all Labels
exports.getAll =   (req, res) =>{

    Label.find()
              .then(labels => res.json(labels))
              .catch(err => res.status(400).json('Error: ' + err));

};

// create a new Label
exports.create = async  (req, res) => {
    const label = new Label({
        label: req.body.label,
        property: req.body.property,
        website: req.body.website,
    });
    try {
        const saved = await label.save();
        res.json(saved);
    } catch (err) {
        res.json({message: err});
    }
};

// get a label by id
exports.getById = async  (req, res) => {
    try {
        const label = await Label.findById(req.params.labelId);
        res.json(label);
    } catch (err) {
        res.json({message: err});
    }
};

// delete a label
exports.delete = async  (req, res) => {
    try {
        const removed = await Label.remove({_id: req.params.labelId});
        res.json(removed);
    } catch (err) {
        res.json({message: err});
    }
};

// update a label
exports.update = async  (req, res) => {
    try {
        const updated = await Label.updateOne(
            { _id: req.params.labelId },
            { $set: { label: req.body.label }}
        );
        res.json(updated);
    } catch (err) {
        res.json({message: err});
    }
};
