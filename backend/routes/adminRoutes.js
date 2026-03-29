const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getAllBookings,
  updateBookingStatus
} = require("../controllers/adminBookingController");

router.get("/bookings", auth.adminOnly, getAllBookings);
router.put("/booking-status", auth.adminOnly, updateBookingStatus);

module.exports = router;
