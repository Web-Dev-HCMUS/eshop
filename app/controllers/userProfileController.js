class aboutUserProfile{
    // [GET] /
    index(req, res, next){
        if (req.user != null || req.user != undefined) {
            res.render('userProfile', {user: req.user});
        }
        else{
            res.redirect('/login');
        }
    }
}

module.exports = new aboutUserProfile();