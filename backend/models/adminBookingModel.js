const db = require("../config/db");

exports.getAllBookings = () => {
  return db.promise().query(`
    SELECT b.id, u.name, u.email,
           b.booking_date, b.time_slot, b.status
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    ORDER BY b.booking_date DESC
  `);
};

exports.updateStatus = (id, status) => {
  return db.promise().query(
    "UPDATE bookings SET status=? WHERE id=?",
    [status, id]
  );
};
