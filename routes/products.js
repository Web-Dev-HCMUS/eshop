const express = require("express");
const router = express.Router();

const productsControlller = require("../app/controllers/productsControlller");

router.get("/:type", productsControlller.show);
router.get("/", productsControlller.index);

module.exports = router;
