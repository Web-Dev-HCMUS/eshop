const mongoose = require("mongoose");
const cartService = require("./cartService");

class cartController {
  async index(req, res, next) {
    if (!req.user) {
      res.status(401).json({ message: "You must be logged in to view cart" });
      return;
    } else {
      const userId = req.user._id;
      const cart = await cartService.getCart(userId);
      const item = cart.products;
      let userItems = [];
      let orderTotal = 0;
      for (let i = 0; i < item.length; i++) {
        let product = await cartService.findProduct(item[i].productId);
        let firstImage = product.image[0];
        product.image = firstImage;
        product.quantity = item[i].quantity;
        let totalPrice =
          item[i].quantity * parseInt(product.price.replaceAll(".", ""));
        orderTotal = orderTotal + totalPrice;
        product.totalPrice = totalPrice.toLocaleString();
        userItems.push(product);
      }
      const userCart = {
        numberOfItems: userItems.length,
        userItems: userItems,
        orderTotal: orderTotal.toLocaleString(),
      };

      res.render("cart", { userCart });
    }
  }
  async add(req, res, next) {
    if (!req.user) {
      res.status(401).json({ message: "You must be logged in to add to cart" });
      return;
    } else {
      const user = req.user._id;
      let cartID = await cartService.findCartbyUserId(user);
      let content = req.body;
      if (!cartID) {
        cartID = new mongoose.Types.ObjectId();
        const createNewCart = await cartService.createNewCart(
          cartID,
          user,
          content
        );
      } else {
        const addItemToCart = await cartService.addItemToCart(cartID, content);
        if (addItemToCart) {
          res
            .status(200)
            .json({ message: "Item added to cart", success: true });
        } else {
          res
            .status(500)
            .json({ message: "Error adding item to cart", success: true });
        }
      }
    }
  }
}
module.exports = new cartController();
