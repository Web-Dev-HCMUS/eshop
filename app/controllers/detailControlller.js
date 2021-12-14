const Product = require('../../models/Product');
const mongooseObject = require('../../ulti/mongoose');

class detailControlller {
    // [GET] /:slug
    show(req, res, next){
        Product.findOne({slug: req.params.slug})
            .then( product => {
                Product.find({type: mongooseObject.mongooseToObject(product).type})
                    .then(products2 => {
                        res.render('detail-product', {
                            product: mongooseObject.mongooseToObject(product),
                            products2: mongooseObject.multipleMongooseToObject(products2),
                            user: req.user
                        });
                    })
                    .catch(error => next(error));
            })
            .catch(error => next(error));
    }
}

module.exports = new detailControlller();
