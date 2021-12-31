const express = require('express');
const router = express.Router();
const myPurchaseController = require('./myPurchaseController');

router.get('/ordered', myPurchaseController.ordered);
router.get('/', myPurchaseController.show);
module.exports = router;