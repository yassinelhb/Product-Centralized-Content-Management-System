const Page = require('../models/page.model')
const Website = require('../models/website.model')



// get all pages
exports.getPages = async function (req, res) {
    try {
        const pages = await Page.find();
        res.json(pages)
    } catch (err) {
        res.json({ message: err });
    }
}


// get page by Id
exports.getOnePage = async  (req, res) => {
    try {
        const page = await Page.findById(req.params.siteId).populate('layout')
        res.json(page);

    } catch (err) {
        res.json({message: err});
    }

}

// add page
exports.addPage = async  (req, res) => {
    try {
        
        const addedPage = await Page.create(req.body).then(result => result.populate('layout').execPopulate())
        await Website.updateOne(
            { _id: req.params.siteId},
            { $push: { "pages" : addedPage._id }})

        res.json(addedPage);

    } catch (err) {
        res.json({message: err});
    }
}


// update page
exports.updatePage = async  (req, res) => {
    try {

        const updatedPage = await Page.findOneAndUpdate(
            { _id: req.body._id },
            { $set: req.body },
            {new: true, useFindAndModify: false}
        ).populate('layout')

        res.json(updatedPage);

    } catch (err) {
        res.json({message: err});
    }
}

// delete page
exports.deletePage = async  (req, res) => {
    try {
        await Link.remove({page: req.params.pageId})
        const removedPage = await Page.remove({_id: req.params.pageId});
        res.json(removedPage);
    } catch (err) {
        res.json({message: err});
    }
}
