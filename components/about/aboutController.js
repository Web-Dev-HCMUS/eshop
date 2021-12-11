const mongooseObject = require('../../ulti/mongoose');

class aboutController{
    // [GET] /
    index(req, res, next){
        res.render('about',{user: req.user});
    }
}

module.exports = new aboutController();