Node.js OAuth 2.0 Client Credentials Flow Demo
🌟 Overview
This project demonstrates the OAuth 2.0 Client Credentials Grant Flow, which is the industry standard for secure API-to-API communication (machine-to-machine authentication). This is critical for enterprise microservices where one backend service needs authorized access to another protected resource server.

This validates core senior-level competencies in authorization design, security protocols, and managing API dependencies.

🛠 Architectural Components
The system is divided into three conceptual components running simultaneously:

Auth Server (Mocked): (Implicitly handled within clientServer.js) - Validates the client_id and client_secret and issues an access token.

Resource Server: (resourceServer.js) - The protected API that checks for a valid Bearer token before serving data.

OAuth Client: (clientServer.js) - Your application that authenticates with the Auth Server, receives a token, and uses that token to access the Resource Server.

🔑 Security and Flow Demonstrated
Grant Type: Client Credentials (Machine-to-Machine).

Token Usage: The fetched token is included in the Authorization: Bearer header when requesting protected data.

Decoupling: The client application does not handle user credentials; it only manages its own client credentials to delegate access.

🚀 How to Run the Demo
Prerequisites
Node.js (v14+)

Install dependencies: npm install express axios dotenv

1. Configure Secrets
Create a file named .env in the root directory (this file is excluded from git for security) and add the following mock credentials:

# .env
CLIENT_ID=client-123
CLIENT_SECRET=super-secret-key
RESOURCE_SERVER_URL=http://localhost:7000 
2. Start Both Servers
Open two separate terminal windows inside the project directory:

Terminal 1 (Resource Server):

Bash

node resourceServer.js
(This server will be running on port 7000)

Terminal 2 (Client Application):

Bash

node clientServer.js
(This server will be running on port 8000)

3. Test the OAuth Flow
Open your browser or use Postman to hit the client's endpoint, which automatically triggers the OAuth flow:

Endpoint: http://localhost:8000/fetch-data

Expected Output
The clientServer.js (port 8000) hits its internal /auth route using the client_id/secret.

It receives a mock access_token.

It successfully uses the token to access the /protected-data endpoint on the Resource Server (port 7000).

The final result should be a JSON response from the client server confirming access.