const crypto = require('crypto');
const mongoose = require('mongoose');

const cacheSchema = new mongoose.Schema({
  key: {type: String, required: true, index: true, unique: true},
  data: {type: String, required: true},
  expires: {type: Date, required: true, default: Date.now() + 60 * 60 * 1000},
}, {timestamps: {}});

cacheSchema.pre('validate', function(next) {
  const isKeyValid = typeof(this.key) == 'string' && this.key.length;
  const secret = isKeyValid ? this.key : false;

  if (secret) {
    this.data = crypto.createHmac('sha256', secret).digest('hex');
  }
  next();
});

module.exports = mongoose.model('Cache', cacheSchema);
