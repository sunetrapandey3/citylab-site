const express = require("express");
require("dotenv").config({ path: __dirname + '/.env' });
const cors = require("cors");

const authRoutes    = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes   = require("./routes/adminRoutes");
const testRoutes    = require("./routes/testRoutes");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"]
}));
app.use(express.json());

app.get("/", (req, res) => res.send("City Lab Backend Running 🧪"));

app.use("/api/auth",     authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin",    adminRoutes);
app.use("/api/tests",    testRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
