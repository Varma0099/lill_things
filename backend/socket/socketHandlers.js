function registerSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('joinActivity', (activityName) => {
      socket.join(activityName);
    });

    socket.on('slotBooked', (data) => {
      io.to(data.activity).emit('slotUpdated', {
        activity: data.activity,
        date: data.date,
        timeSlot: data.timeSlot,
        spotsLeft: data.spotsLeft
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

module.exports = registerSocketHandlers; 