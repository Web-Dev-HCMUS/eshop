const express = require("express");
const router = express.Router();

const productsController = require("./productsController");

router.get("/:type", productsController.show);
router.get("/", productsController.index);
//router.get("/?query", productsControlller.query);
module.exports = router;
