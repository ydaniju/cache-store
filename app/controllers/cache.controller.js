const Cache = require('../models/cache.model');

const CacheController = {};

CacheController.getCaches = (req, res) => {
  return Cache.find({}, (err, caches) => {
    if (err) {
      return res.status(500).end();
    }
    return res.status(200).json(caches);
  });
};

module.exports = CacheController;
