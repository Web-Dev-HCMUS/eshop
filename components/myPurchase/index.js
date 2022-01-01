const express = require('express');
const router = express.Router();
const myPurchaseController = require('./myPurchaseController');

router.get('/:status', myPurchaseController.getPurchase);
router.get('/cancel/:_id', myPurchaseController.cancelOrder);
router.get('/', myPurchaseController.show);
module.exports = router;