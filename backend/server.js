const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL Database Configuration
const db = mysql.createConnection({
  user: 'root',
  password: 'tiger123',
  database: 'userdb', // Corrected database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Unable to connect to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.post('/login', (req, res) => {
  const { contact, password } = req.body;

  if (!contact || !password) {
    return res.status(400).json({ success: false, message: 'Contact and password are required' });
  }

  // Query the database for a user with the provided contact
  db.query('SELECT * FROM user_info WHERE contact = ?', [contact], async (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (results.length > 0) {
      // Compare the provided password with the stored password
      const passwordMatch = await bcrypt.compare(password, results[0].password);

      if (passwordMatch) {
        return res.json({ success: true, message: 'Login successful!' });
      } else {
        return res.status(401).json({ success: false, message: 'Incorrect password' });
      }
    } else {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
  });
});

app.post('/api/signup', (req, res) => {
  const { name, email, contact, password } = req.body;

  if (!name || !email || !contact || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Check if the user already exists
  db.query('SELECT * FROM user_info WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Error checking existing user:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (results.length > 0) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    } else {
      // Hash the password
      const saltRounds = 10;

      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the new user into the database
        db.query(
          'INSERT INTO user_info (name, email, contact, password) VALUES (?, ?, ?, ?)',
          [name, email, contact, hashedPassword],
          (err) => {
            if (err) {
              console.error('Error inserting new user:', err);
              return res.status(500).json({ success: false, message: 'Internal server error' });
            }

            return res.json({ success: true, message: 'Signup successful' });
          }
        );
      } catch (hashError) {
        console.error('Error hashing password:', hashError);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
