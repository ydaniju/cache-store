const express = require('express');
/* eslint-disable-next-line */
const router = express.Router();

const CacheController = require('../app/controllers/cache.controller');

router.get('/', (req, res) => res.json('Welcome to Cache store by @ydaniju'));

// GET '/caches'
router.get('/caches', CacheController.index);

// GET '/caches/:key'
router.get('/caches/:key', CacheController.show);

// POST '/caches'
router.post('/caches', CacheController.create);

router.patch('/caches/:key', CacheController.update);

// DELETE '/caches/:key'
router.delete('/caches/:key', CacheController.destroy);

// DELETE '/caches'
router.delete('/caches', CacheController.destroyAll);

module.exports = router;
