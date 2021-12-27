const express = require("express");
const router = express.Router();
const cart = require("../components/cart/cartController");
router.post("/add", cart.add);
router.post("/remove", cart.remove);
router.post("/updateQuantity", cart.updateQuantity);
module.exports = router;
