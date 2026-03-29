const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getAvailableSlots,
  bookTest,
  getMyBookings,
  cancelBooking
} = require("../controllers/bookingController");

router.get("/slots", getAvailableSlots);          // public — no auth needed to view slots
router.post("/book", auth, bookTest);
router.get("/my-bookings", auth, getMyBookings);
router.delete("/:id", auth, cancelBooking);

module.exports = router;
