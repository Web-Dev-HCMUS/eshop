const cartModel = require("../../models/Cart");
const productModel = require("../../models/Product");
const userModel = require("../../models/User");
const mongoose = require("mongoose");
const util = require("../../ulti/mongoose");

exports.getOrderedCart = async (req) => {
    const carts = await cartModel.find({username: req.user.username});
    for(let i=0; i<carts.length; i++){
        console.log(carts[i].products);
    }

};

