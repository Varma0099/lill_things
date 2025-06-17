const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    participants: { type: Number, required: true, min: 1, max: 8 }
  },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
  activityName: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  confirmationCode: { type: String, unique: true, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'],
    default: 'confirmed'
  },
  emailSent: {
    customerConfirmation: { type: Boolean, default: false },
    ownerNotification: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema); 