const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getAllBookings,
  updateBookingStatus
} = require("../controllers/adminBookingController");

router.get("/bookings", auth, getAllBookings);
router.put("/booking-status", auth, updateBookingStatus);

module.exports = router;
