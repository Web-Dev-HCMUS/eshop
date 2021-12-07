const Product = require('../models/Product')
const mongooseObject = require('../../ulti/mongoose');

class contactController{
    // [GET] /
    index(req, res, next){
        res.render('contact',{user: req.user});
    }
}

module.exports = new contactController();