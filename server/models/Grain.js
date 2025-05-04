// server/models/Grain.js
const mongoose = require('mongoose');

const GrainSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    mr: { type: String, required: true }
  },
  price:       { type: Number, required: true },
  unit:        { type: String, default: 'per kg' },
  lastUpdated: { type: Date,   default: Date.now },
  imageUrl:     { type: String, default: '' },
});

module.exports = mongoose.model('Grain', GrainSchema);