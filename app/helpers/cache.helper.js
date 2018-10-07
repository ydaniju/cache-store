const Cache = require('../models/cache.model');

const create = (params, res) => {
  Cache.create(params, function (err, cache) {
    if (err) return res.status(422).json(err.message);
    return res.status(201).json(cache);
  });
};

module.exports = { create }
