const ProductType = require('../models/ProductType.model');
const Page = require('../models/page.model');
const Website = require('../models/website.model');
const Link = require('../models/link.model');

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

// assign a product type to a website
exports.assignTypeToWebsite = async  (req, res) => {
    const saved = await Page.create(req.body)
        .then(async (s)=>{
            await  res.json(s);
            const link = new Link({
                link_text: s.page_name,
                page: s._id
            });

            await link.save(
                await Website.updateOne(
                    { _id: req.body.website },
                    { $push: { pages : s._id , 'header.links' : link._id }}
                )
            )
        })
        .catch(err => res.status(400).json('Error: ' + err));
};

// get  Product Types by website
exports.getByWebsite =   (req, res) =>{
    Page.find({website:req.params.websiteId,type:"category"})
        .then(pages => {
            const types =[];
            pages.forEach( async  (page,i) =>{
                    const type = await ProductType.findById(page.get('productType'));
                    types.push(type);

                    if(i === pages.length -1){

                        res.json(types);
                    }
                }
            );


        })
        .catch(err => res.status(400).json('Error: ' + err));

};
// get  Product Types pages by website
exports.getTypesPagesByWebsite =   (req, res) =>{
    Page.find({website:req.params.websiteId,type:"category"})
        .then(pages => {

            res.json(pages);


        })
        .catch(err => res.status(400).json('Error: ' + err));

};
