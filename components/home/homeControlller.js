const mongooseObject = require('../../ulti/mongoose');
const homeService = require('./homeService');
const Product = require('../../models/Product')

exports.list = async function(req, res){
    const products = await homeService.list();
    res.render('home',{products: mongooseObject.multipleMongooseToObject(products), user: req.user});
};