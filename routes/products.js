const express = require("express");
const router = express.Router();

const productsControlller = require("../app/controllers/productsControlller");

router.get("/:type", productsControlller.show);
router.get("/", productsControlller.index);
//router.get("/?query", productsControlller.query);
module.exports = router;
