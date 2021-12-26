const express = require("express");
const router = express.Router();
const cart = require("../components/cart/cartController");
router.post("/add", cart.add);

module.exports = router;
