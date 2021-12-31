const express = require("express");
const router = express.Router();
const cartController = require("./cartController");
const authMiddleWare = require("../../middleware/authMiddleware");

router.get('/checkout', authMiddleWare, cartController.checkoutPage);
router.post('/checkout', authMiddleWare, cartController.checkout);
router.get('/add/:productId', cartController.add);
router.get('/update/:productId', cartController.updateCart);
router.get('/', cartController.index);

module.exports = router;
