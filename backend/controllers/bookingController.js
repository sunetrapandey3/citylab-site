const Booking = require("../models/bookingModel");

const ALL_SLOTS = [
  "09:00-09:30",
  "09:30-10:00",
  "10:00-10:30",
  "10:30-11:00",
  "11:00-11:30",
  "11:30-12:00"
];

exports.getAvailableSlots = async (req, res) => {
  const { testId, date } = req.query;

  const [booked] = await Booking.getBookedSlots(testId, date);
  const bookedSlots = booked.map(b => b.time_slot);

  const available = ALL_SLOTS.filter(s => !bookedSlots.includes(s));

  res.json({ availableSlots: available });
};

exports.bookTest = async (req, res) => {
  const userId = req.user.id;
  const { testId, date, timeSlot } = req.body;

  const [existing] = await Booking.checkSlot(testId, date, timeSlot);

  if (existing.length > 0) {
    return res.status(400).json({ error: "Slot already booked ❌" });
  }

  await Booking.createBooking(userId, testId, date, timeSlot);

  res.json({ message: "Booking confirmed 🎉" });
};

exports.getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await Booking.getUserBookings(userId);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

