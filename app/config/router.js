const express = require('express');
/* eslint-disable-next-line */
const router = express.Router();

const CacheController = require('../controllers/cache.controller');

// Get all Caches
router.get('/caches', CacheController.getCaches);

module.exports = router;
