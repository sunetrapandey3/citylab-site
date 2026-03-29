const db = require("../config/db");

exports.checkSlot = (testId, date, slot) => {
  return db.promise().query(
    "SELECT * FROM bookings WHERE test_id=? AND booking_date=? AND time_slot=? AND status != 'cancelled'",
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
    "SELECT time_slot FROM bookings WHERE test_id=? AND booking_date=? AND status != 'cancelled'",
    [testId, date]
  );
};

exports.getUserBookings = (userId) => {
  return db.promise().query(
    `SELECT b.id, t.name AS test_name, t.category, t.price,
            b.booking_date, b.time_slot, b.status, b.created_at
     FROM bookings b
     JOIN tests t ON b.test_id = t.id
     WHERE b.user_id = ?
     ORDER BY b.booking_date DESC, b.time_slot ASC`,
    [userId]
  );
};

exports.cancelBooking = (bookingId, userId) => {
  return db.promise().query(
    "UPDATE bookings SET status='cancelled' WHERE id=? AND user_id=?",
    [bookingId, userId]
  );
};
