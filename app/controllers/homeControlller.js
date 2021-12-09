const Product = require('../models/Product')
const mongooseObject = require('../../ulti/mongoose');

class homeControlller {
    // [GET] /
    index(req, res, next){
        Product.find({})
            .then(products => {
                res.render('home',{products: mongooseObject.multipleMongooseToObject(products),
                user: req.user});
            })
            .catch(error => next(error));
    }
}

module.exports = new homeControlller();