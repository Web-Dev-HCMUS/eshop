const express = require("express");
const router = express.Router();
const detailProductApiController = require('./detailProductApiController');

router.use('/:productID/comment', detailProductApiController.postComment);

module.exports = router;