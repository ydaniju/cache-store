var mongoose = require('mongoose');

const cacheSchema = new mongoose.Schema({
  key: {
    type: String, required: true, index: true, unique: true },
  data: { type: String, required: true },
});

module.exports = mongoose.model('Cache', cacheSchema);
