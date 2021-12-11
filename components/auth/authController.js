const User = require('../../app/models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.login = async function(req, res, next){
    const wrongPassword = req.query['wrong-password'] !== undefined;
    res.render('login', { wrongPassword});
};

exports.logout = async function(req, res, next){
    req.logout();
    res.redirect('/');
};

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                username: req.body.username,
                password: hash
            });
            user.save()
                .then(() => {
                    res.redirect('/login')
                })
                .catch((error) => {
                    res.status(500).json({
                        error: error
                    });
                });
        });
}