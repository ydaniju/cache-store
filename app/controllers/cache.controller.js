const Cache = require('../models/cache.model');

const CacheController = {
  index: (req, res) => {
    return Cache.find({}, (err, caches) => {
      if (err) return res.status(500).json(err.message);
      return res.status(200).json(caches);
    });
  },
  show: (req, res) => {
    return Cache.findOne({key: req.params.key}, (err, cache) => {
      if (err) return res.status(500).end();
      if (!cache) {
        /* eslint-disable-next-line */
        console.log('Cache miss');
        return Cache.create(req.params, function(err, cache) {
          if (err) return res.status(422).json(err.message);
          return res.status(201).json(cache);
        });
      }
      /* eslint-disable-next-line */
      console.log('Cache hit');
      return res.status(200).json(cache);
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
      return res
          .status(200)
          .json({'message': `Cache with key ${req.params.key} deleted!`});
    });
  },
  destroyAll: (req, res) => {
    return Cache.remove({}, (err) => {
      if (err) return res.status(500).end();
      return res
        .status(200)
        .json({ 'message': `All caches cleared!` });
    });
  },
};

module.exports = CacheController;
