const db = require("../config/db");

exports.getAllBookings = () => {
  return db.promise().query(`
    SELECT b.id, u.name AS user_name, u.email,
           t.name AS test_name, t.category, t.price,
           b.booking_date, b.time_slot, b.status, b.created_at
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN tests  t ON b.test_id = t.id
    ORDER BY b.booking_date DESC, b.time_slot ASC
  `);
};

exports.updateStatus = (id, status) => {
  return db.promise().query(
    "UPDATE bookings SET status=? WHERE id=?",
    [status, id]
  );
};
