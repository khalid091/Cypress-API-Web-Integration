# Coin Trading Application

This application consists of a WebSocket-enabled API server and a frontend web application for coin trading.

## Important Note About Project Structure

This project has two separate directories with their own package.json and dependencies:

1. **app/** - Contains the main application code
   - Has its own `package.json` for application dependencies
   - Dependencies include: express, cors, ws

2. **test/** - Contains all test-related code
   - Has its own `package.json` for test dependencies
   - Dependencies include: cypress, jest, supertest, superwstest
   - See test/README.md for test setup instructions

Make sure to install dependencies in both directories separately.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js) or Yarn (v1.22 or higher)

## Installation

1. Navigate to the app directory:
```bash
cd app
```

2. Install dependencies using npm:
```bash
npm install
```

Or using Yarn:
```bash
yarn install
```

### Required Dependencies

```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "ws": "^8.x"
  }
}
```

## Running the Application

### 1. Start the API Server

The API server provides both HTTP and WebSocket endpoints:

```bash
# Using npm
npm start
# Or using Yarn
yarn start
```

The server will start on port 3100. You should see:
```
[SERVER]: Server is running at http://localhost:3100
```

#### Available Endpoints:

- **HTTP Endpoints:**
  - `GET /get-coins` - Returns list of available coins
  - `GET /get-inventory` - Returns current inventory
  - `POST /purchase-coin` - Handles coin purchases/sales
  - `GET /` - Welcome message

- **WebSocket Endpoint:**
  - `ws://localhost:3100/` - Real-time coin price updates

### 2. Start the Frontend

In a new terminal:

```bash
npm run dev
```

The frontend will start on port 5713. You can access it at:
```
http://localhost:5713
```

## Features

- Real-time coin price updates via WebSocket
- Coin trading functionality (buy/sell)
- USD balance tracking
- Multiple coin types with different price behaviors:
  - CoinA: Random price changes
  - CoinB: Incremental price increase
  - CoinC: Price surge and crash pattern
  - CoinD: Price changes based on ownership

## Troubleshooting

1. **Port Already in Use**
   - If port 3100 is in use, you can find and kill the process:
     ```bash
     # On Windows
     netstat -ano | findstr :3100
     taskkill /F /PID <PID>
     ```

2. **WebSocket Connection Issues**
   - Ensure the server is running
   - Check browser console for connection errors
   - Verify WebSocket URL is correct

3. **Frontend Not Loading**
   - Check if the API server is running
   - Verify the frontend is running on port 5713
   - Check browser console for errors

## Development

- The server uses Express for HTTP endpoints and `ws` for WebSocket functionality
- Price updates are sent every second
- The server maintains state for coins and inventory 