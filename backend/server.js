const express = require("express");
require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes"); // ✅ REQUIRED

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("City Lab Backend Running 🧪");
});

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes); // ✅ REQUIRED

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

