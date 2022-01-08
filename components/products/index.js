const express = require("express");
const router = express.Router();

const productsController = require("./productsController");

router.get("/search", productsController.show);
router.get("/category/:category", productsController.category);
router.get("/", productsController.index);

module.exports = router;
