const mongoose = require("mongoose");
const cartService = require("./cartService");

class cartController {
  async index(req, res, next) {
    if (!req.user) {
      res.status(401).json({ message: "You must be logged in to view cart" });
      return;
    } else {
      const userId = req.user._id;
      const cart = await cartService.getCartById(userId);
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
        cartId: mongoose.Types.ObjectId(cart._id).toString(),
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
      let cart = await cartService.getCartById(user);
      let content = req.body;
      if (!cart) {
        const cartID = new mongoose.Types.ObjectId();
        const createNewCart = await cartService.createNewCart(
          cartID,
          user,
          content
        );
      } else {
        let existQuantity = content.quantity;
        cart.products.filter((item) => {
          if (
            mongoose.Types.ObjectId(item.productId).toString() ===
            mongoose.Types.ObjectId(content.productId).toString()
          ) {
            existQuantity = parseInt(item.quantity) + parseInt(existQuantity);
          }
        });
        let result = false;
        if (existQuantity !== content.quantity) {
          content.quantity = existQuantity;
          result = await cartService.updateItem(cart._id, content);
        } else {
          result = await cartService.addItemToCart(cart._id, content);
        }
        if (result) {
          res
            .status(200)
            .json({ message: "Item is added to cart", success: true });
        } else {
          res
            .status(500)
            .json({ message: "Error adding item to cart", success: true });
        }
      }
    }
  }
  async remove(req, res, next) {
    if (!req.user) {
      res.status(401).json({ message: "You must be logged in to add to cart" });
      return;
    } else {
      let content = req.body;
      let result = await cartService.removeItem(
        req.body.cartId,
        req.body.productId
      );
      if (result) {
        res
          .status(200)
          .json({ message: "Item is removed from cart", success: true });
      } else {
        res.status(500).json({
          message: "Error when removing item from cart",
          success: true,
        });
      }
    }
  }
}
module.exports = new cartController();
