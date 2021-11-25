const Product = require('../models/Product')
const mongooseObject = require('../../ulti/mongoose');

class aboutController{
    // [GET] /
    index(req, res, next){
        res.render('about');
    }
}

module.exports = new aboutController();