const crypto = require('crypto');
const mongoose = require('mongoose');
const MAX_COUNT = process.env.MAX_CACHE_LIMIT || 5;
const TTL = process.env.CACHE_TTL || 60 * 60 * 1000;

const cacheSchema = new mongoose.Schema({
  key: {type: String, required: true, index: true, unique: true},
  data: {type: String, required: true},
  expires: {type: Date, required: true, default: Date.now() + TTL},
}, {timestamps: {}});

cacheSchema.pre('validate', function(next) {
  const isKeyValid = typeof(this.key) == 'string' && this.key.length;
  const secret = isKeyValid ? this.key : false;

  if (secret) {
    this.data = crypto.createHmac('sha256', secret).digest('hex');
  }
  next();
});

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

cacheSchema.post('findOne', function(cache, next) {
  this.updateOne,({key: cache.key}, {expires: Date.now() + TTL}, (err) => {
    if (err) next(err);
  });
  next();
});

module.exports = mongoose.model('Cache', cacheSchema);
