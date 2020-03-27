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
    const user = res.locals.user;
    console.log(user);
    if(user.role==="admin"){
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
    else {  res.json({error : " You cant"})}
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
                res.json({error : "Mot de passe incorrecte "});
            }
        }
    })
}

exports.loginn = async  (req, res , next) => {
    const token = req.headers.authorization;
    if(token){
    const user = parseToken(token);
    users.findById(user.users._id, function (err , user) {
        if(err){return res.json({error: "User n'existe pas2"});}
        if(user){
            res.locals.user = user;
            next();
        }
        else {
            return res.json({error: "User n'existe pas 3"});
        }
    })

    }
    else{res.json({error: "vous devez s'authentifier"});}


}
function parseToken(token) {
    return jwt.verify(token.split(' ')[1],'secret');
    
}


