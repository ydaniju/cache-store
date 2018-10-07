const Cache = require('../models/cache.model');
const cacheHelper = require('../helpers/cache.helper');

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
        return cacheHelper.create(req.params, res);
      }
      /* eslint-disable-next-line */
      console.log('Cache hit');
      return res.status(200).json(cache);
    });
  },
  create: (req, res) => cacheHelper.create(req.body, res),
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
    return Cache.deleteMany({}, (err) => {
      if (err) return res.status(500).end();
      return res
        .status(200)
        .json({ 'message': `All caches cleared!` });
    });
  },
};

module.exports = CacheController;
