// resourceServer.js
const express = require('express');
const app = express();
const RESOURCE_PORT = 7000;

// Middleware to check for a valid Bearer Token (Simulated)
const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // In a real app, validate the token (JWT, expiry, scope)
        console.log('Resource Server: Token received and accepted.');
        req.token = authHeader.split(' ')[1];
        next();
    } else {
        console.log('Resource Server: Access denied (Missing token).');
        res.status(401).json({ error: 'Unauthorized: Bearer token required.' });
    }
};

// Protected API Endpoint
app.get('/protected-data', checkAuth, (req, res) => {
    res.json({ data: 'This data is secured by OAuth 2.0.', source: 'Resource Server' });
});

app.listen(RESOURCE_PORT, () => console.log(`Resource Server running on port ${RESOURCE_PORT}`));
