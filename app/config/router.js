const express = require('express');
const router = express.Router();

const CacheController = require('../controllers/cache.controller');

// Get all Caches
router.get('/caches', CacheController.GetCaches);

module.exports = router;
