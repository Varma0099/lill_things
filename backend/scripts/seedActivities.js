require('dotenv').config();
const mongoose = require('mongoose');
const Activity = require('../models/Activity');

const activities = [
  { name: 'Pottery Making', icon: '🏺', color: 'from-pink-500 to-rose-500', description: 'Shape clay into beautiful pottery' },
  { name: 'Ceramic Crafting', icon: '🎨', color: 'from-purple-500 to-pink-500', description: 'Create stunning ceramic pieces' },
  { name: 'Art & Painting', icon: '🖌️', color: 'from-orange-500 to-yellow-500', description: 'Express yourself through colors' },
  { name: 'Creative Food Center', icon: '👨‍🍳', color: 'from-green-500 to-teal-500', description: 'Cook while you create' },
  { name: 'Mixed Activities', icon: '✨', color: 'from-indigo-500 to-purple-500', description: 'Try multiple creative activities' },
  { name: 'Bharatanatyam', icon: '💃', color: 'from-red-500 to-orange-500', description: 'Classical Indian dance and storytelling' },
  { name: 'Acting Studio', icon: '🎭', color: 'from-blue-500 to-cyan-500', description: 'Explore drama and performance arts' }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/littlethings_booking');
  await Activity.deleteMany({});
  await Activity.insertMany(activities);
  console.log('Activities seeded!');
  await mongoose.disconnect();
}

seed();