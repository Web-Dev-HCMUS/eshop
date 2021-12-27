const express = require('express');
const router = express.Router();

const detailControlller = require('./detailProductController');

router.get('/:slug', detailControlller.show);
router.post('/:slug/comment', detailControlller.postComment);

module.exports = router;