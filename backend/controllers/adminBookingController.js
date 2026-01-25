const AdminBooking = require("../models/adminBookingModel");

exports.getAllBookings = async (req, res) => {
  const [rows] = await AdminBooking.getAllBookings();
  res.json(rows);
};

exports.updateBookingStatus = async (req, res) => {
  const { bookingId, status } = req.body;
  await AdminBooking.updateStatus(bookingId, status);
  res.json({ message: "Booking updated ✅" });
};
