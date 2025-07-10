// backend/models/Merchant.js
const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Merchant', merchantSchema);