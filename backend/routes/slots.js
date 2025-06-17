const express = require('express');
const Activity = require('../models/Activity');
const Slot = require('../models/Slot');

const router = express.Router();

const TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
];

// GET /api/slots/availability?activity=Pottery%20Making&date=2025-06-18
router.get('/availability', async (req, res) => {
  const { activity, date } = req.query;
  if (!activity || !date) {
    return res.status(400).json({ message: 'Missing activity or date' });
  }
  try {
    // Normalize activity name to match the format in the database
    const normalizedActivity = activity.trim();
    const activityDoc = await Activity.findOne({ name: new RegExp('^' + normalizedActivity + '$', 'i') });
    if (!activityDoc) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    const slots = await Slot.find({
      activityId: activityDoc._id,
      date: new Date(date)
    });

    // Map all time slots
    const availableSlots = TIME_SLOTS.map((timeSlot) => {
      const slot = slots.find(s => s.timeSlot === timeSlot);
      if (slot) {
        return {
          timeSlot,
          available: slot.isAvailable && slot.currentBookings < slot.maxCapacity,
          spotsLeft: Math.max(0, slot.maxCapacity - slot.currentBookings)
        };
      } else {
        return {
          timeSlot,
          available: true,
          spotsLeft: activityDoc.maxCapacity
        };
      }
    });

    res.json({
      date,
      activity: activityDoc.name,
      availableSlots
    });
  } catch (err) {
    console.error('Error fetching slot availability:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 