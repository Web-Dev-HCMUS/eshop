const productModel = require('../../models/Product')

exports.list = () => productModel.find({});
