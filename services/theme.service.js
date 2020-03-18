const Theme = require('../models/theme.model')


// get back all the themes
exports.getThemes = async function (req, res) {
    try {
        const themes = await Theme.find();
        res.json(themes)
    } catch (err) {
        res.json({ message: err });
    }
}

// submit a theme
exports.addTheme = async  (req, res) => {
    const theme = new Theme({
        theme_name: req.body.theme_name,
        description: req.body.description,
        theme_img: req.body.theme_img
    });
    try {
        const savedTheme = await theme.save();
        res.json(savedTheme);
    } catch (err) {
        res.json({message: err});
    }
}


// specific theme
exports.getOneTheme = async  (req, res) => {
    try {
        const theme = await Theme.findById(req.params.themeId);
        res.json(theme);
    } catch (err) {
        res.json({message: err});
    }
}

// delete theme
exports.deleteTheme = async  (req, res) => {
    try {
        const removedTheme = await Theme.remove({_id: req.params.themeId});
        res.json(removedTheme);
    } catch (err) {
        res.json({message: err});
    }
}

// update a theme
exports.updateTheme = async  (req, res) => {
    try {
        const updatedTheme = await Theme.updateOne(
            { _id: req.params.themeId },
            { $set: { theme_img: req.body.theme_img }}
        );
        res.json(updatedTheme);
    } catch (err) {
        res.json({message: err});
    }
}

