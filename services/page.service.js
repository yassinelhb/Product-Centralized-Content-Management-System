const Page = require('../models/page.model')
const Link = require('../models/link.model')
const Website = require('../models/website.model')


// get all pages
exports.getPages = async function (req, res) {
    try {
        const pages = await Page.find({ website : req.params.siteId }).populate('layout').populate({
            path: 'website',
            populate: {
                path: 'theme'
            }
        })
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
        const exist = await Page.find({ website : req.body.website, page_name : req.body.page_name }).count()

        if (exist === 0) {
            const addedPage = await Page.create(req.body).then(result => result.populate('layout').execPopulate())
            res.json(addedPage);
        } else {
            res.json({message: 'Page already exist'})
        }


    } catch (err) {
        res.json({message: err});
    }
}


// update page
exports.updatePage = async  (req, res) => {
    try {

        const exist = await Page.find({ website : req.body.website, page_name : req.body.page_name, _id : {$ne: req.body._id } }).count()

        if ( exist === 0) {

            const updatedPage = await Page.findOneAndUpdate(
                { _id: req.body._id },
                { $set: req.body },
                {new: true, useFindAndModify: false}
            ).populate('layout')

            res.json(updatedPage);
        } else {
            res.json({message: 'Page already exist'})
        }



    } catch (err) {
        res.json({message: err});
    }
}

// delete page
exports.deletePage = async  (req, res) => {
    try {

        const removedPage =  await Link.remove({ page : req.params.pageId  }, async function() {
             await Page.remove({ _id : req.params.pageId  })
        });

        res.json(removedPage)


    } catch (err) {
        res.json({message: err});
    }
}
