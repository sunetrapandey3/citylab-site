const db = require("../config/db");

exports.checkSlot = (testId, date, slot) => {
  return db.promise().query(
    "SELECT * FROM bookings WHERE test_id=? AND booking_date=? AND time_slot=?",
    [testId, date, slot]
  );
};

exports.createBooking = (userId, testId, date, slot) => {
  return db.promise().query(
    "INSERT INTO bookings (user_id, test_id, booking_date, time_slot) VALUES (?,?,?,?)",
    [userId, testId, date, slot]
  );
};

exports.getBookedSlots = (testId, date) => {
  return db.promise().query(
    "SELECT time_slot FROM bookings WHERE test_id=? AND booking_date=?",
    [testId, date]
  );
};

exports.getUserBookings = (userId) => {
  return db.promise().query(
    `SELECT id, booking_date, time_slot, status
     FROM bookings
     WHERE user_id = ?
     ORDER BY booking_date DESC`,
    [userId]
  );
};


