const Blog = require('../models/Blog');

exports.addBlog = async  (req, res) => {
                const blog = new Blog({
                    Title: req.body.Title,
                    Description: req.body.Description,
                    Image: req.body.Image,
                    website: req.body.website,
                    users: req.body.users,
                    Statut: "desactivated"
                });
                    blog.save((err, blog) => {
                    if (err) res.json(err);
                    else res.json(blog);
                });

}
exports.getBlog = async  (req, res)=> {
    try {
        const blog = Blog.find().populate('website').populate('users').then(user => res.json(user));
    } catch (err) {
        res.json({message: err});
    }
}

    exports.updateBlog = async  (req, res) => {
        try {
            const updated = await Blog.updateOne(
                { _id: req.params.id },
                { $set: {
                        Title:req.body.Title,
                        Description:req.body.Description,
                        Image:req.body.Image,
                        website:req.body.website,
                        users:req.body.users,
                    }},

                {new: true, useFindAndModify: false}
            );
            res.json(updated);
        } catch (err) {
            res.json({message: err});
        }
    };



exports.validationBlog = async  (req, res) => {
    try {
        const updated = await Blog.updateOne(
            { _id: req.params.id },
            { $set: {
                    Statut: "Activated",
                }},

            {new: true, useFindAndModify: false}
        );
        res.json(updated);
    } catch (err) {
        res.json({message: err});
    }
};

