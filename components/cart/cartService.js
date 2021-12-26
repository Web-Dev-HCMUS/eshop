const Cart = require("../../models/cart");
const Product = require("../../models/Product");
const mongoose = require("mongoose");
const util = require("../../ulti/mongoose");

exports.createNewCart = (cartId, userId, content) => {
  const newItem = {};
  const cart = new Cart({
    _id: cartId,
    userId: userId,
    products: [
      {
        productId: content.productId,
        quantity: content.quantity,
      },
    ],
  });
  cart.save();
};
exports.addItemToCart = async (cartId, content) => {
  const newItem = { productId: content.productId, quantity: content.quantity };
  let result = await Cart.updateOne(
    { _id: new mongoose.Types.ObjectId(cartId) },
    {
      $push: {
        products: newItem,
      },
    }
  );
  result = result.modifiedCount === 0 ? false : true;
  return result;
};
exports.findCartbyUserId = async (userId) => {
  const cart = await Cart.findOne({
    userId: new mongoose.Types.ObjectId(userId),
  });
  const cartObject = util.mongooseToObject(cart);
  const cartId = cartObject ? cartObject._id : null;
  return cartId;
};

exports.getCart = async (userId) => {
  const cart = await Cart.findOne({
    userId: new mongoose.Types.ObjectId(userId),
  });
  const cartObject = util.mongooseToObject(cart);
  return cartObject;
};
exports.findProduct = async (productId) => {
  const product = await Product.findOne({
    _id: new mongoose.Types.ObjectId(productId),
  });
  const productObject = util.mongooseToObject(product);
  return productObject;
};
