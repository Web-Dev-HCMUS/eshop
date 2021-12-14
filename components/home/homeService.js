const Product = require('../../models/Product')

exports.list = () => Product.find({});
