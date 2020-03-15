const Website = require('../models/website.model')


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
        const savedWebsite = await website.save();
        res.json(savedWebsite);
    } catch (err) {
        res.json({message: err});
    }
}


// specific website
exports.getOneWebsite = async  (req, res) => {
    try {
        const website = await Website.findById(req.params.siteId).populate("theme");
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
        let updatedWebsite;

        // remove link
        if (req.params.type === 'remove'){
            updatedWebsite = await Website.updateOne(
                { _id: req.body.site_id },
                { $pull: { "header.links" : { link_text :  req.body.link_text , link_path :  req.body.link_path}}});
        }

        // add link
        if(req.params.type === 'add'){

            updatedWebsite = await Website.updateOne(
                { _id: req.body.site_id, "header.links": {"$not": { "$elemMatch": { link_text :  req.body.link_text, link_path :  req.body.link_path }}}},
                { $addToSet: { "header.links" : { link_text :  req.body.link_text, link_path :  req.body.link_path  }}});

        }

        // edit link
        if(req.params.type === 'edit') {
            let link = {};
            link["header.links." +req.body.link_index] = {
                link_text: req.body.link_text,
                link_path: req.body.link_path
            }
            updatedWebsite = await Website.updateOne(
                {
                    _id: req.body.site_id,
                    "header.links": {
                        "$not": {
                            "$elemMatch": {
                                link_text: req.body.link_text,
                                link_path: req.body.link_path
                            }
                        }
                    },
                },
                {
                    $set: link
                });
        }
        res.json(updatedWebsite);

    } catch (err) {
        res.json({message: err});
    }
}

