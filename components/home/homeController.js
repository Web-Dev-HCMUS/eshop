const homeService = require('./homeService');
const mongooseObject = require('../../ulti/mongoose');
const Product = require('../../models/Product');

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