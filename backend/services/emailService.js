const transporter = require('../config/email');

const emailTemplates = {
  customerConfirmation: (booking) => ({
    to: booking.customerInfo.email,
    subject: `🎨 Booking Confirmed - ${booking.activityName} at Little Things`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #fdf2f8 0%, #fef3ff 50%, #fff7ed 100%); padding: 30px; border-radius: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #ec4899; font-size: 28px; margin-bottom: 10px;">🎉 Booking Confirmed!</h1>
          <p style="color: #6b7280; font-size: 16px;">Your creative journey awaits at Little Things</p>
        </div>
        <div style="background: rgba(255,255,255,0.7); padding: 25px; border-radius: 15px; margin: 20px 0;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Booking Details</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div><strong>Name:</strong> ${booking.customerInfo.name}</div>
            <div><strong>Activity:</strong> ${booking.activityName}</div>
            <div><strong>Date:</strong> ${new Date(booking.bookingDate).toLocaleDateString()}</div>
            <div><strong>Time:</strong> ${booking.timeSlot}</div>
            <div><strong>Participants:</strong> ${booking.customerInfo.participants}</div>
            <div><strong>Confirmation:</strong> <code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">${booking.confirmationCode}</code></div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #6b7280;">We can't wait to see you create something amazing!</p>
        </div>
      </div>
    `
  }),
  ownerNotification: (booking) => ({
    to: process.env.OWNER_EMAIL,
    subject: `📅 New Booking: ${booking.activityName} - ${booking.customerInfo.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #dc2626;">New Booking Alert!</h2>
        <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3>Customer Details:</h3>
          <p><strong>Name:</strong> ${booking.customerInfo.name}</p>
          <p><strong>Email:</strong> ${booking.customerInfo.email}</p>
          <p><strong>Phone:</strong> ${booking.customerInfo.phone}</p>
          <p><strong>Participants:</strong> ${booking.customerInfo.participants}</p>
          <h3>Booking Details:</h3>
          <p><strong>Activity:</strong> ${booking.activityName}</p>
          <p><strong>Date:</strong> ${new Date(booking.bookingDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${booking.timeSlot}</p>
          <p><strong>Confirmation Code:</strong> ${booking.confirmationCode}</p>
          <p><strong>Booked At:</strong> ${new Date(booking.createdAt).toLocaleString()}</p>
        </div>
      </div>
    `
  })
};

const sendCustomerConfirmation = async (booking) => {
  const mailOptions = emailTemplates.customerConfirmation(booking);
  await transporter.sendMail(mailOptions);
};

const sendOwnerNotification = async (booking) => {
  const mailOptions = emailTemplates.ownerNotification(booking);
  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendCustomerConfirmation,
  sendOwnerNotification
}; 