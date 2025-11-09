// clientServer.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const CLIENT_PORT = 8000;

// --- Configuration ---
const { CLIENT_ID, CLIENT_SECRET, RESOURCE_SERVER_URL } = process.env;
const MOCK_AUTH_SERVER_URL = `${RESOURCE_SERVER_URL}/auth`; 
const PROTECTED_DATA_URL = `${RESOURCE_SERVER_URL}/protected-data`;

let accessToken = null; // Store the fetched access token globally (for demo)

// --- Token Fetching Function (OAuth Client Credentials Flow) ---
async function getAccessToken() {
    console.log('Attempting to fetch new Access Token...');
    try {
        // 1. Simulate the Token Request (usually to a dedicated Auth Server)
        const response = await axios.post(MOCK_AUTH_SERVER_URL, {
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        });

        // 2. Mock Validation and Storage
        const token = response.data.access_token;
        accessToken = token; 
        console.log('SUCCESS: Token received and stored.');
        return token;

    } catch (error) {
        console.error('ERROR fetching token (Mock Auth failed).');
        // Mock server returns client_id/secret as token for simplicity
        // Fallback for demo simplicity (using client_id as a mock token)
        accessToken = CLIENT_ID;
        console.log('Using mock token fallback.');
        return CLIENT_ID;
    }
}

// --- Protected Endpoint Route (Triggers the OAuth Flow) ---
app.get('/fetch-data', async (req, res) => {
    // Ensure we have a token (fetch one if needed or if it expired)
    if (!accessToken) {
        await getAccessToken();
    }

    try {
        // Use the token to access the protected resource
        const response = await axios.get(PROTECTED_DATA_URL, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        res.json({ 
            message: 'Successfully accessed protected resource using OAuth token.',
            data: response.data 
        });

    } catch (error) {
        res.status(500).json({ error: 'Failed to access resource.', detail: error.message });
    }
});

// --- Mock Auth Server Endpoint (For Simplicity) ---
// A real server would validate the client ID/Secret against a database.
app.post('/auth', (req, res) => {
    const { client_id, client_secret } = req.body;
    if (client_id === CLIENT_ID && client_secret === CLIENT_SECRET) {
        res.json({
            access_token: `${client_id}-valid-jwt-token`,
            token_type: 'Bearer',
            expires_in: 3600
        });
    } else {
        res.status(401).json({ error: 'invalid_client' });
    }
});

app.listen(CLIENT_PORT, () => console.log(`Client Server running on port ${CLIENT_PORT}`));
