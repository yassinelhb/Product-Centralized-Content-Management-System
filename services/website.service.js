const Website = require('../models/website.model')
const Page = require('../models/page.model')
const Link = require('../models/link.model')


// get back all the websites
exports.getWebsites = async function (req, res) {
    try {
        const websites = await Website.find();
        res.json(websites)
    } catch (err) {
        res.json({ message: err });
    }
}

// submit a website
exports.addWebsite = async  (req, res) => {
    const website = new Website({
        domain: req.body.domain,
        logo_pic: req.body.logo_pic,
        site_name: req.body.site_name,
        theme: req.body.theme
    });
    try {
        const savedWebsite = await website.save(
            createPages(website._id)
        );
        res.json(savedWebsite);
    } catch (err) {
        res.json({message: err});
    }
}

const createPages = function(websiteId){

    const arrayPages = [
        new Page({ page_name : 'home', description : 'home description'}),
        new Page({ page_name : 'index', description : 'index description'}),
        new Page({ page_name : 'category', description : 'category description'}),
        new Page({ page_name : 'contact', description : 'contact description'})]


    arrayPages.forEach(async (page)=> {
            const savedPage = await page.save();

            const link = new Link({
                link_text: page.page_name,
                page: savedPage._id
            })
            const savedLink = await link.save();

            await Website.updateOne(
                { _id: websiteId },
                { $push: { pages : savedPage._id , 'header.links' : savedLink._id }}
            );
    })


}

// specific website
exports.getOneWebsite = async  (req, res) => {
    try {
        const website = await Website.findById(req.params.siteId)
            .populate('theme')
            .populate('pages')
            .populate({
                    path: 'header.links',
                    populate: {
                        path: 'page'
                    }
                });

        res.json(website);
    } catch (err) {
        res.json({message: err});
    }

}

// delete website
exports.deleteWebsite = async  (req, res) => {
    try {
        const removedWebsite = await Website.remove({_id: req.params.siteId});
        res.json(removedWebsite);
    } catch (err) {
        res.json({message: err});
    }
}

// update a website
exports.updateWebsite = async  (req, res) => {
    try {
        const updatedWebsite = await Website.updateOne(
            { _id: req.params.siteId },
            { $set: { theme: req.body.theme }}
        );
        res.json(updatedWebsite);
    } catch (err) {
        res.json({message: err});
    }
}

// update links of header ( add or remove )
exports.updateLinksHeader = async  (req, res) => {
    try {
        let updateLinks;

        // remove link
        if (req.params.type === 'remove'){
            await Link.deleteOne({ _id : req.body._id});
        }

        // add link
        if(req.params.type === 'add'){

            let link = new Link({
                link_text:  req.body.link_text,
                page :  req.body.page
            })

            updateLinks =  await link.save().then(link => link.populate('page').execPopulate())

            await Website.updateOne(
                    { _id: req.body.site_id},
                    { $push: { "header.links" : link._id }})

        }

        // edit link
        if(req.params.type === 'edit') {

            updateLinks = await Link.findOneAndUpdate(
                {_id: req.body._id},
                { $set: { link_text: req.body.link_text, page: req.body.page }},
                {new: true, useFindAndModify: false}).populate('page')

        }

        res.json(updateLinks);

    } catch (err) {
        res.json({message: err});
    }
}

