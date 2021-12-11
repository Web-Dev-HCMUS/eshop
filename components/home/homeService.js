const Product = require('../../app/models/Product')

exports.list = () => Product.find({});
