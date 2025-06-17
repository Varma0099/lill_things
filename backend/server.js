require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/database');
const registerSocketHandlers = require('./socket/socketHandlers');

const bookingsRouter = require('./routes/bookings');
const slotsRouter = require('./routes/slots');
const activitiesRouter = require('./routes/activities');
// TODO: Add admin routers

const app = express();
const server = http.createServer(app);
// Root route - MUST HAVE THIS
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend API is running!',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});
// Connect to MongoDB
connectDB();

const allowedOrigins = [
  'http://localhost:3000', // for local development
  'https://lill-things-frontendd.onrender.com' // your deployed frontend
];

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// API routes
app.use('/api/bookings', bookingsRouter);
app.use('/api/slots', slotsRouter);
app.use('/api/activities', activitiesRouter);
// TODO: app.use('/api/admin', ...)

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server error' });
});

// Socket.IO
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
});
registerSocketHandlers(io);

app.set('io', io);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 