const express = require('express');
/* eslint-disable-next-line */
const router = express.Router();

const CacheController = require('../app/controllers/cache.controller');

// GET '/caches'
router.get('/caches', CacheController.getAll);

// POST '/caches'
router.post('/caches', CacheController.create);

module.exports = router;
