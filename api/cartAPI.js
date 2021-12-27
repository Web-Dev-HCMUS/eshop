const express = require("express");
const router = express.Router();
const cart = require("../components/cart/cartController");
router.post("/add", cart.add);
router.post("/remove", cart.remove);
module.exports = router;
