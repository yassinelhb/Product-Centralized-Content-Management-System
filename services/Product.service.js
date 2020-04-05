import productProperties from "../client/src/views/productProperty/productProperties";
const Page = require('../models/page.model');
const Website = require('../models/website.model');
const Link = require('../models/link.model');
const SubType = require('../models/ProductSubType.model');
const Layout = require('../models/layout.model');
const Product = require('../models/Product.model');

// get all Products
exports.getAll =   (req, res) =>{

    Product.find().populate('subType')
              .then(products => res.json(products))
              .catch(err => res.status(400).json('Error: ' + err));

};
// get all Products by country
exports.findByCountry =   (req, res) =>{

    Product.find({country_code:req.params.country}).populate('subType')
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));

};
// get all Products by website
exports.findByWebsite =   (req, res) =>{
    Page.find({website:req.params.websiteId,type:"product"}).populate('subType')
        .then(pages => {
            const products =[];
            pages.forEach( async  (page,i) =>{
                    const product = await Product.findById(page.get('product'));
                    products.push(product);

                    if(i === pages.length -1){

                        await res.json(products);
                    }
                }
            );


        })
        .catch(err => res.status(400).json('Error: ' + err));

};
// get  Product Types pages by website
exports.getPagesByWebsite =   (req, res) =>{
    Page.find({website:req.params.websiteId,type:"detail"})
        .then(pages => {

            res.json(pages);


        })
        .catch(err => res.status(400).json('Error: ' + err));

};
// create a new product
exports.create = async  (req, res) => {


        const saved = await Product.create(req.body)
            .then( product =>
                {
                    const productLayout =  Layout.findOne({website:req.params.websiteId,layout_name:'detail'}).then().catch();

                    const b ={

                        "page_name":product.name,
                        "type":"product",
                        "productSubType":product.subType,
                        "product":product._id,
                        "website":req.params.websiteId,
                        "layout":productLayout._id
                    };
                    Page.create(req.body).then().catch();
                    res.json(product);
                }

            )
            .catch(err => res.status(400).json('Error: ' + err));

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

