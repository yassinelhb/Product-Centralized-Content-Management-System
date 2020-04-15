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
