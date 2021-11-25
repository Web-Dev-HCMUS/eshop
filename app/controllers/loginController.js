const Product = require('../models/Product')
const mongooseObject = require('../../ulti/mongoose');

class loginController{
    // [GET] /
    index(req, res, next){
        res.render('login');
    }
}

module.exports = new loginController();