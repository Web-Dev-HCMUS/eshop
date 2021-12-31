const cartModel = require("../../models/Cart");
const productModel = require("../../models/Product");
const userModel = require("../../models/User");
const mongoose = require("mongoose");
const util = require("../../ulti/mongoose");

exports.createNewCart = async (req) => {
  await cartModel.create({
    username: req.user.username,
    products: req.session.cart,
    orderTotal : req.session.totalOrderPrice,
    checkoutInformation:{
      ...
      req.body,
      creditCardNumber: req.body['card-num']
    },
    deliveryInformation:{
      ...
      req.body,
      firstName: req.body['first-name'],
      lastName: req.body['last-name'],
    },
    status : 'Ordered'
  })
};

exports.findCartIdbyUserId = async (userId) => {
  const cart = await cartModel.findOne({
    userId: new mongoose.Types.ObjectId(userId),
  });
  const cartObject = util.mongooseToObject(cart);
  const cartId = cartObject ? cartObject._id : null;
  return cartId;
};

exports.getCartById = async (userId) => {
  const cart = await cartModel.findOne({
    userId: new mongoose.Types.ObjectId(userId),
  });
  const cartObject = util.mongooseToObject(cart);
  return cartObject;
};

exports.getCart = async (cartId) => {
  const cart = await cartModel.findOne({
    _id: new mongoose.Types.ObjectId(cartId),
  });
  const cartObject = util.mongooseToObject(cart);
  return cartObject;
};
exports.removeItem = async (cartId, productId) => {
  let result = await cartModel.updateOne(
    { _id: new mongoose.Types.ObjectId(cartId) },
    {
      $pull: {
        products: {
          productId: new mongoose.Types.ObjectId(productId),
        },
      },
    }
  );
  result = result.modifiedCount === 0 ? false : true;
  return result;
};

exports.addItemToCart = async (req) => {
  const productId = req.params.productId;
  const product = await productModel.findOne({_id: productId}).lean();

  const productAdd = {
    _id: product._id,
    name: product.name,
    price: product.price,
    quantity: 1,
    totalPrice: product.price,
    image: product.image[0],
    slug: product.slug
  };

  if(typeof req.session.cart == "undefined"){
    req.session.cart = [];
    req.session.cart.push(productAdd);
  } else {
    const cart = req.session.cart;
    let newProduct = true;

    for(let i=0; i<cart.length; i++){
      if(cart[i]._id === productId){
        cart[i].quantity++;
        cart[i].totalPrice = cart[i].price * cart[i].quantity;
        newProduct = false;
        break;
      }
    }
    if(newProduct){
      cart.push(productAdd);
    }
  }

  req.session.totalOrderPrice = 0;
  const cart = req.session.cart;
  for(let i = 0; i < cart.length; i++) {
    req.session.totalOrderPrice += cart[i].price * cart[i].quantity;
  }
};

exports.updateItemInCart = async (req) => {
  let cart = req.session.cart;

  for (let i = 0; i <cart.length; i++) {
    if (cart[i]._id === req.params.productId) {
      switch (req.query.action) {
        case 'quantity':
          cart[i].quantity = req.query.quantity;
          cart[i].totalPrice = cart[i].price * cart[i].quantity;
          break;
        case 'remove':
          cart.splice(i, 1);
          if (cart.length === 0) {
            delete cart;
            delete req.session.totalOrderPrice;
          }
          break;
      }
    }
  }

  req.session.totalOrderPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    req.session.totalOrderPrice += cart[i].price * cart[i].quantity;
  }
};
