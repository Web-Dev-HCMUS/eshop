const Product = require('../models/Product')
const mongooseObject = require('../../ulti/mongoose');

class contactController{
    // [GET] /
    index(req, res, next){
        res.render('contact');
    }
}

module.exports = new contactController();