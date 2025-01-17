const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const path = require('path');

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // Replace with your MySQL username
    password: 'yashesh', // Replace with your MySQL password
    database: 'user'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

const app = express();
const PORT = 3000;

// Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use any email service
    auth: {
        user: 'yasheshpatel425@gmail.com', // Replace with your email
        pass: 'svyo fdfh qatv hhot'   // Replace with your email password
    }
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve register.html
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

// Handle registration POST request
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    
    // Validate incoming data
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    db.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length > 0) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Insert new user into the database
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, result) => {
            if (err) {
                console.error('Error inserting into the database:', err);
                return res.status(500).json({ message: 'Database error' });
            }

            // Send confirmation email
            const mailOptions = {
                from: 'yasheshpatel425@gmail.com',     // Replace with your email
                to: email,                        // The user's email
                subject: 'Registration Successful',
                text: `Hello ${username},\n\nThank you for registering on our platform!`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).json({ message: 'Error sending confirmation email' });
                }
                console.log('Email sent:', info.response);
                
                // Redirect to index.html after successful registration
                res.redirect('/');
            });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
