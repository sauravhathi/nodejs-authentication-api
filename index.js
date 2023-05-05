const express = require('express');
const app = express();
// Middleware to parse JSON
app.use(express.json());

const port = 3000;

// Object to store user data
const users = {};

// Signup endpoint
app.post('/signup', (req, res) => {
    // Get username, email and password from request body
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email and password are required' });
    }
    if (users[username]) {
        return res.status(409).json({ error: '⛔ Username already exists' });
    }
    // Store user data in users object
    users[username] = { email, password };

    res.status(201).json({ message: '✅ Signup successful' });
});

// Login endpoint
app.post('/login', (req, res) => {
    // Get username and password from request body
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    if (!users[username] || users[username].password !== password) {
        return res.status(401).json({ error: '⛔ Invalid username or password' });
    }

    // Send username and email in response
    res.status(200).json({ message: '✅ Login successful', username, email: users[username].email });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server started on port http://localhost:${port}`);
});