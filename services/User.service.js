const users = require('../models/users')
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");

exports.getuser = async function (req, res) {
    try {
        const User = await users.find();
        res.json(User)
    } catch (err) {
        res.json({ message: err });
    }
}

exports.register = async  (req, res) => {
    users.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            const User = new users({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
                role: req.body.role,
                country: req.body.country,
                site: req.body.site,
                function: req.body.function
            });
            User.save((err, User) => {
                if (err) res.json(err);
                else res.json(User);
            });
        }

else {
        res.json({error : " User already exist"})
    }
    })
}

exports.login = async  (req, res) => {
    users.findOne({email: req.body.email}, (err, users) => {
        if (err) res.json(err)
        if (!users) res.json({error: "User n'existe pas"});
        else {
            if (bcrypt.compareSync(req.body.password, users.password)) {
                var token = jwt.sign({users}, 'secret', {expiresIn: 3600})
                res.json(token)
            } else {
                res.status(401).json("Mot de passe incorrecte")
            }
        }
    })
}

exports.loginn = async  (req, res) => {
    const token = req.headers.authorization;
    if(token){res.json({error: "User existe "});}
    else{res.json({error: "User n'existe pas"});}


}
