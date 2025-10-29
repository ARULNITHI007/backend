// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// POST API to store user data
app.post('/register', (req, res) => {
  const { userid, password } = req.body;
  if (!userid || !password) {
    return res.status(400).send('User ID and password required');
  }

  const sql = 'INSERT INTO users (userid, password) VALUES (?, ?)';
  db.query(sql, [userid, password], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error saving user');
    }
    res.send('User registered successfully!');
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});