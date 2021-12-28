const express = require("express");
const router = express.Router();
const cartAPI = require("./cartAPI");
const productApi = require('./detailProduct');

router.use("/cart", cartAPI);

router.use('/product', productApi);

module.exports = router;
