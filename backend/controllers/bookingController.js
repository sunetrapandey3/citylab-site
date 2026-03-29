const Booking = require("../models/bookingModel");

// 30-min slots 9:00 AM → 7:00 PM
const ALL_SLOTS = [
  "09:00-09:30", "09:30-10:00", "10:00-10:30", "10:30-11:00",
  "11:00-11:30", "11:30-12:00", "12:00-12:30", "12:30-13:00",
  "13:00-13:30", "13:30-14:00", "14:00-14:30", "14:30-15:00",
  "15:00-15:30", "15:30-16:00", "16:00-16:30", "16:30-17:00",
  "17:00-17:30", "17:30-18:00", "18:00-18:30", "18:30-19:00"
];

exports.getAvailableSlots = async (req, res) => {
  try {
    const { testId, date } = req.query;
    if (!testId || !date) return res.status(400).json({ error: "testId and date are required" });

    const [booked] = await Booking.getBookedSlots(testId, date);
    const bookedSlots = booked.map(b => b.time_slot);
    const available = ALL_SLOTS.filter(s => !bookedSlots.includes(s));

    res.json({ allSlots: ALL_SLOTS, availableSlots: available, bookedSlots });
  } catch (err) {
    res.status(500).json({ error: "Failed to get slots" });
  }
};

exports.bookTest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { testId, date, timeSlot } = req.body;

    if (!testId || !date || !timeSlot)
      return res.status(400).json({ error: "testId, date and timeSlot are required" });

    const [existing] = await Booking.checkSlot(testId, date, timeSlot);
    if (existing.length > 0)
      return res.status(400).json({ error: "This slot is already booked. Please choose another." });

    await Booking.createBooking(userId, testId, date, timeSlot);
    res.json({ message: "Booking confirmed! See you at the lab." });
  } catch (err) {
    res.status(500).json({ error: "Booking failed" });
  }
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

exports.cancelBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const [result] = await Booking.cancelBooking(id, userId);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Booking not found or not yours" });
    res.json({ message: "Booking cancelled." });
  } catch (err) {
    res.status(500).json({ error: "Cancellation failed" });
  }
};
