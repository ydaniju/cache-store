const Cache = require('../models/cache.model');

const CacheController = {
  getAll: (req, res) => {
    return Cache.find({}, (err, caches) => {
      if (err) return res.status(500).json(err.message);
      return res.status(200).json(caches);
    });
  },
  create: (req, res) => {
    return Cache.create(req.body, function(err, cache) {
      if (err) return res.status(422).json(err.message);
      return res.status(201).json(cache);
    });
  },
  destroy: (req, res) => {
    return Cache.findOneAndDelete({key: req.params.key}, (err, cache) => {
      if (err) return res.status(500).end();
      if (!cache) return res.status(404).end();
      return res.status(200).json({'message': 'Cache deleted!'});
    });
  },
};

module.exports = CacheController;
