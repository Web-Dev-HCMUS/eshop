const Product = require('../models/Product')
const mongooseObject = require('../../ulti/mongoose');

class productsControlller {
    // [GET] /
    index(req, res, next){
        Product.find({})
            .then(products => {
                res.render('products',{products: mongooseObject.multipleMongooseToObject(products)});
            })
            .catch(error => next(error));
    }

    // [GET] /:type
    show(req, res, next){
        Product.find({ type: req.params.type})
            .then(products => {
                res.render('products',{products: mongooseObject.multipleMongooseToObject(products)});
            })
            .catch(error => next(error));
    }
}

module.exports = new productsControlller();