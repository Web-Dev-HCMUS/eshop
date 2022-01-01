const cartService = require("./cartService");

class cartController {
  index(req, res, next) {
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
    delete req.session.cart;
    delete req.session.totalOrderPrice;
    res.redirect('/my-purchase/ordered');
  }

}
module.exports = new cartController();
