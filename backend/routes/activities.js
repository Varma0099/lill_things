const express = require('express');
const Activity = require('../models/Activity');

const router = express.Router();

// GET /api/activities - Get all active activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find({ isActive: true });
    res.json({ activities });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 