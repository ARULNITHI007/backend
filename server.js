require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: { rejectUnauthorized: true }
});

connection.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// Route to insert user data
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send("Missing email or password");

  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  connection.query(query, [email, password], err => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Error saving data");
    }
    res.send("✅ Successfully submitted!");
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 8080}`);
});
