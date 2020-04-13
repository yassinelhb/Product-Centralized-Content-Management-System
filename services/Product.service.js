const Page = require('../models/page.model');
const Website = require('../models/website.model');
const Link = require('../models/link.model');
const SubType = require('../models/ProductSubType.model');
const Layout = require('../models/layout.model');
const Product = require('../models/Product.model');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/product')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname )
    }
});


var upload = multer({ storage: storage });

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
                    const product = await Product.findById(page.get('product')).populate('subType');
                    products.push(product);

                    if(i === pages.length -1){

                        await res.json(products);
                    }
                }
            );


        })
        .catch(err => res.status(400).json('Error: ' + err));

};
// get  Product  pages by website
exports.getPagesByWebsite =   (req, res) =>{
    Page.find({website:req.params.websiteId,type:"product"})
        .then(pages => {

            res.json(pages);


        })
        .catch(err => res.status(400).json('Error: ' + err));

};
// create a new product
exports.create = [ upload.single('file'),async  (req, res) => {

       const prod = req.body;
        prod.picture =req.file.filename;
        const saved = await Product.create(prod)
            .then( async (product) =>
                {
                    const productLayout = await Layout.findOne({website:req.params.websiteId,layout_name:'detail'}).then().catch();
                    const SubTypePage = await Page.findOne({website:req.params.websiteId,type:'subCategory',productSubType:product.subType}).then().catch();
    console.log(productLayout);
                    const b ={

                        "page_name":product.title,
                        "type":"product",
                        "productSubType":product.subType,
                        "SubTypePage":SubTypePage._id,
                        "product":product._id,
                        "website":req.params.websiteId,
                        "layout":productLayout._id
                    };
                    console.log(b);

                    Page.create(b).then().catch();
                    res.json(product);
                }

            )
            .catch(err => res.status(400).json('Error: ' + err));

}];

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
        const removed = await Product.remove({_id: req.params.productId}).then(p =>{
            Page.remove({product: req.params.productId,type:'product'});
        }).catch();
        res.json(removed);
    } catch (err) {
        res.json({message: err});
    }
};
// remove a product from website
exports.removeFromWebsite = async  (req, res) => {
    try {
        const removed = await Page.remove({product: req.params.productId,website: req.params.websiteId,type:'product'});
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
exports.getPicture = (req, res) => {
    var filename = req.params.picture;
    res.download('assets/product/' + filename);
};
// assign a  product to website
exports.assignToWebsite = async  (req, res) => {



                const productLayout = await Layout.findOne({website:req.params.websiteId,layout_name:'detail'}).then().catch();
                console.log(productLayout);
                const b ={

                    "page_name":req.body.title,
                    "type":"product",
                    "productSubType":req.body.subType,
                    "product":req.body._id,
                    "website":req.params.websiteId,
                    "layout":productLayout._id
                };
                console.log(b);

    await    Page.create(b).then(page => res.json(page)).catch(err => res.status(400).json('Error: ' + err));




};
