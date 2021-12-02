const Product = require('../models/Product')
const mongooseObject = require('../../ulti/mongoose');

// change limit product will show on products page
const perPage = 6;

class productsControlller {
    // [GET] /
    async index(req, res, next){
        const totalDoc = await Product.find({}).count();
        const totalPage = Math.ceil(totalDoc / perPage);
        const currentPage = req.query.page || 1;
        const products = await Product.find({})
                                        .skip(perPage * (currentPage-1))
                                        .limit(perPage);

        res.render('products', {
            products: mongooseObject.multipleMongooseToObject(products),
            totalPage: totalPage
        });
    }

    // [GET] /:type
    async show(req, res, next){
        const totalDoc = await Product.find({ type: req.params.type}).count();
        const totalPage = Math.ceil(totalDoc / perPage);
        const currentPage = req.query.page || 1;
        const products = await Product.find({ type: req.params.type})
            .skip(perPage * (currentPage-1))
            .limit(perPage);

        res.render('products', {
            products: mongooseObject.multipleMongooseToObject(products),
            totalPage: totalPage
        });
    }
}

module.exports = new productsControlller();