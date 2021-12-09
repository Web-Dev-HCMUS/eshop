exports.login = async function(req, res, next){
    const wrongPassword = req.query['wrong-password'] !== undefined;
    res.render('login', { wrongPassword});
};

exports.logout = async function(req, res, next){
    req.logout();
    res.redirect('/');
};