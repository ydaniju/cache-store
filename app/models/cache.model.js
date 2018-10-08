const crypto = require('crypto');
const mongoose = require('mongoose');
const MAX_COUNT = process.env.MAX_CACHE_LIMIT || 5;
const TTL = process.env.CACHE_TTL || 60 * 60 * 1000;

const cacheSchema = new mongoose.Schema({
  key: {type: String, required: true, index: true, unique: true},
  data: {type: String, required: true},
  expires: {type: Date, required: true, default: Date.now() + TTL},
}, {timestamps: {}});

// Runs before each validation
cacheSchema.pre('validate', function(next) {
  const isKeyValid = typeof(this.key) == 'string' && this.key.length;
  const secret = isKeyValid ? this.key : false;

  if (secret) {
    const salt = secret + Date.now.toString();
    this.data = crypto.createHmac('sha256', salt).digest('hex');
  }
  next();
});

// Runs before saving to ensure maximum cache count is not exceeded
cacheSchema.pre('save', function(next) {
  const self = this;
  self.constructor.countDocuments((err, cacheCount) => {
    if (err) next(err);

    if (cacheCount == MAX_COUNT) {
      // overwrite old entry
    }
    next();
  });
});

// Runs after each find of a cache to update the cache
cacheSchema.post('findOne', function(cache, next) {
  if (!cache) next(); // clause to safeguard against using cache when it is null
  const salt = cache.key + Date.now.toString();
  const newCacheData = crypto.createHmac('sha256', salt).digest('hex');
  // only return old data if it has not expired
  const cacheData = cache.expires >= Date.now() ? cache.data : newCacheData;
  this.updateOne(
    { key: cache.key },
    { expires: Date.now() + TTL, data: cacheData},
    (err) => {
      if (err) next(err);
    }
  );
  next();
});

module.exports = mongoose.model('Cache', cacheSchema);
