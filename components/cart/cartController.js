const mongoose = require("mongoose");
const cartService = require("./cartService");
const {addItemToCart} = require("./cartService");

class cartController {
  async index(req, res, next) {
    res.render('../components/cart/views/cart');
  }
  async add(req, res, next) {
    await cartService.addItemToCart(req);

    res.json({cart: req.session.cart, totalOrderPrice:req.session.totalOrderPrice});
  }

  async updateCart(req, res, next) {
    await cartService.updateItemInCart(req);
    res.json({cart: req.session.cart, totalOrderPrice: req.session.totalOrderPrice});
  }

  checkoutPage(req, res, next){
    res.render('../components/cart/views/checkout');
  }

  async checkout(req, res, next){
    await cartService.createNewCart(req);
    res.redirect('/user-profile');
  }

}
module.exports = new cartController();
