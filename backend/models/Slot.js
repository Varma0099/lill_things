const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
  date: { type: Date, required: true },
  timeSlot: {
    type: String,
    required: true,
    enum: [
      '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
      '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
    ]
  },
  maxCapacity: { type: Number, required: true },
  currentBookings: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  priceOverride: Number,
  createdAt: { type: Date, default: Date.now }
});

slotSchema.index({ activityId: 1, date: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model('Slot', slotSchema); 