const express = require('express');
const router = express.Router();

const detailController = require('./detailProductController');

router.get('/:slug', detailController.show);
router.post('/:slug/comment', detailController.postComment);

module.exports = router;