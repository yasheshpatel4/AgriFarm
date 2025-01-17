const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // Replace with your MySQL username
    password: 'yashesh', // Replace with your MySQL password
    database: 'user'     // Replace with your MySQL database name
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

// Serve the index.html on the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/ferti.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'ferti.html'));
  });

app.post('/index', (req, res) => {
    const { USERNAME, PASSWORD } = req.body;

    if (!USERNAME || !PASSWORD) {
        return res.status(400).send('Username and Password are required');
    }

    // Check if the username and password match in the database
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [USERNAME, PASSWORD], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).send('Database error');
        }

        if (results.length > 0) {
            // Redirect to index.html if the credentials are correct
            res.redirect('/');
        } else {
            // Send an error message if the credentials are incorrect
            res.send(`<script>alert('Invalid username or password'); window.location.href='/login.html';</script>`);
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
