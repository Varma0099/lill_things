const express = require('express');
const mongoose = require('mongoose');
const Slot = require('../models/Slot');
const Booking = require('../models/Booking');
const Activity = require('../models/Activity');
const { sendCustomerConfirmation, sendOwnerNotification } = require('../services/emailService');

const router = express.Router();

function generateConfirmationCode() {
  // Example: LT2025ABC123
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `LT${year}${rand}`;
}

router.post('/', async (req, res) => {
  const { customerInfo, activity, date, time } = req.body;
  if (!customerInfo || !activity || !date || !time) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      // Normalize activity name
      const normalizedActivity = activity.trim();
      const activityDoc = await Activity.findOne({ name: normalizedActivity }).session(session);
      if (!activityDoc) {
        throw new Error('Activity not found');
      }

      // Find or create slot
      let slot = await Slot.findOne({
        activityId: activityDoc._id,
        date: new Date(date),
        timeSlot: time
      }).session(session);

      if (!slot) {
        slot = await Slot.create([{
          activityId: activityDoc._id,
          date: new Date(date),
          timeSlot: time,
          maxCapacity: activityDoc.maxCapacity,
          currentBookings: 0,
          isAvailable: true
        }], { session });
        slot = slot[0];
      }

      if (!slot.isAvailable || slot.currentBookings + customerInfo.participants > slot.maxCapacity) {
        throw new Error('Slot is full');
      }

      // Create booking
      const confirmationCode = generateConfirmationCode();
      const booking = await Booking.create([{
        customerInfo,
        slotId: slot._id,
        activityName: activityDoc.name,
        bookingDate: new Date(date),
        timeSlot: time,
        confirmationCode,
        status: 'confirmed',
        createdAt: new Date(),
        updatedAt: new Date()
      }], { session });

      // Update slot
      await Slot.updateOne(
        { _id: slot._id },
        { $inc: { currentBookings: customerInfo.participants } },
        { session }
      );

      // Emit socket event for real-time updates
      req.app.get('io').to(normalizedActivity).emit('slotUpdated', {
        activity: normalizedActivity,
        date,
        timeSlot: time,
        spotsLeft: slot.maxCapacity - (slot.currentBookings + customerInfo.participants)
      });

      // Send emails (async, not blocking response)
      sendCustomerConfirmation(booking[0]).catch(console.error);
      sendOwnerNotification(booking[0]).catch(console.error);

      res.json({
        success: true,
        booking: booking[0]
      });
    });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(err.message === 'Activity not found' ? 404 : 400).json({
      success: false,
      message: err.message || 'Failed to create booking'
    });
  } finally {
    session.endSession();
  }
});

module.exports = router; 