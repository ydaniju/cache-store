'use strict';
let mongoose = require('mongoose');

const cacheSchema = new mongoose.Schema({
  key: {type: String, required: true, index: true, unique: true},
  data: {type: String, required: true},
  expires: {type: Date, required: true, default: Date.now() + 60 * 60 * 1000},
}, {timestamps: {createdAt: 'created_at'}});

module.exports = mongoose.model('Cache', cacheSchema);
