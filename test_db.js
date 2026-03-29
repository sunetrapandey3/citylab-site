require('dotenv').config({ path: './backend/.env' });
const db = require('./backend/config/db');

async function test() {
  try {
    const [rows] = await db.promise().query("SELECT id, name, email, is_admin FROM users WHERE email = 'admin@citylab.com'");
    console.log("Admin User found:", rows);
    if (rows.length === 0) {
      console.log("CRITICAL: Admin user not found in database!");
    } else {
      const mysql = require("mysql2");
      const [all] = await db.promise().query("SELECT email FROM users");
      console.log("All users in DB:", all.map(u => u.email));
    }
    process.exit(0);
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1);
  }
}

test();
