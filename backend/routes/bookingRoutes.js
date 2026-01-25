const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getAvailableSlots,
  bookTest,
  getMyBookings
} = require("../controllers/bookingController");

router.get("/slots", auth, getAvailableSlots);
router.post("/book", auth, bookTest);
router.get("/my-bookings", auth, getMyBookings);

module.exports = router;
