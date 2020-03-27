const Layout = require('../models/layout.model')


// get all layouts
exports.getLayout = async function (req, res) {
    try {
        const layout = await Layout.find({ website : req.params.siteId }).populate({
            path: 'website',
            populate: {
                path: 'theme'
            }
        });
        res.json(layout)
    } catch (err) {
        res.json({ message: err });
    }
}
