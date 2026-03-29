const bcrypt = require("bcrypt");
const jwt    = require("jsonwebtoken");
const User   = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const [existing] = await User.findByEmail(email);
    if (existing.length > 0)
      return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    await User.createUser(name, email, hashed);
    res.json({ message: "Account created successfully! Please login." });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

    const [rows] = await User.findByEmail(email);
    if (rows.length === 0)
      return res.status(400).json({ error: "No account found with this email" });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ error: "Incorrect password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, is_admin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Logged in!",
      token,
      user: { id: user.id, name: user.name, email: user.email, is_admin: user.is_admin }
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Login failed: " + err.message });
  }
};
