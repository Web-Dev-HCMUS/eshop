const express = require("express");
const router = express.Router();
const cartAPI = require("./cartAPI");
router.use("/cart", cartAPI);

module.exports = router;
