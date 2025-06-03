# SDET Exercise

This application consists of a WebSocket-enabled API server and a frontend web application for coin trading.

## Project Structure

```
app/
├── public/                    # Static files
│   ├── index.html            # Main HTML file
│   ├── styles/               # CSS styles
│   └── scripts/              # Frontend JavaScript files
│
├── src/                      # Source code
│   ├── server.js            # Main server file
│   ├── routes/              # API route handlers
│   ├── websocket/           # WebSocket handlers
│   └── utils/               # Utility functions
│
├── package.json             # Project dependencies
├── package-lock.json        # Lock file for dependencies
└── README.md               # This file
```

## Dependencies

### Core Dependencies
```json
{
  "dependencies": {
    "cors": "^2.8.5",        # Cross-Origin Resource Sharing
    "express": "^4.18.2",    # Web framework
    "ws": "^8.x"            # WebSocket implementation
  }
}
```

### Development Dependencies
```json
{
  "devDependencies": {
    "nodemon": "^2.x",      # Auto-restart server during development
    "vite": "^4.x"         # Frontend build tool
  }
}
```

## Running the Application

### 1. Installation

1. Navigate to the app directory:
```bash
cd app
```

2. Install dependencies:
```bash
npm install
```

### 2. Starting the Server

1. Start the API server:
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on port 3100. You should see:
```
[SERVER]: Server is running at http://localhost:3100
```

### 3. Accessing the Application

1. **API Server**:
   - HTTP endpoints: `http://localhost:3100`
   - WebSocket endpoint: `ws://localhost:3100`

2. **Web Browser**:
   - Open your browser and navigate to: `http://localhost:5713`
   - The frontend will automatically connect to the WebSocket server

### 4. Available Endpoints

#### HTTP Endpoints
- `GET /get-coins` - Returns list of available coins
- `GET /get-inventory` - Returns current inventory
- `POST /purchase-coin` - Handles coin purchases/sales
- `GET /` - Welcome message

#### WebSocket Endpoint
- `ws://localhost:3100/` - Real-time coin price updates

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

## Development Notes

- The server uses Express for HTTP endpoints and `ws` for WebSocket functionality
- Price updates are sent every second
- The server maintains state for coins and inventory
- Frontend is built with vanilla JavaScript and uses Vite for development
- WebSocket connection is automatically established when the frontend loads
