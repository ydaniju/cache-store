const Cache = require('../models/cache.model');

const CacheController = {
  getAll: (req, res) => {
    return Cache.find({}, (err, caches) => {
      if (err) {
        return res.status(500).json(err.message);
      }
      return res.status(200).json(caches);
    });
  },
  create: (req, res) => {
    console.log(req.body)
    return Cache.create(req.body, function (err, cache) {
      if (err) {
        return res.status(422).json(err.message);
      }
      return res.status(201).json(cache);
    });
  },
};

module.exports = CacheController;
