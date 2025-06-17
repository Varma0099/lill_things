const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: [
      'Pottery Making',
      'Ceramic Crafting',
      'Art & Painting',
      'Creative Food Center',
      'Mixed Activities',
      'Bharatanatyam',
      'Acting Studio'
    ]
  },
  description: String,
  icon: String,
  color: String,
  duration: { type: Number, default: 60 },
  maxCapacity: { type: Number, default: 8 },
  price: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema); 