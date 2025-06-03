# Test Suite Setup

## Important Note About Project Structure

This project has two separate directories with their own package.json and dependencies:

1. **app/** - Contains the main application code
   - Has its own `package.json` for application dependencies
   - Dependencies include: express, cors, ws
   - See app/README.md for application setup instructions

2. **test/** - Contains all test-related code
   - Has its own `package.json` for test dependencies
   - Dependencies include: cypress, jest, supertest, superwstest
   - This directory contains all test setup and execution files

Make sure to install dependencies in both directories separately.

## Project Structure

```
test/
├── cypress/                    # Cypress E2E test files
│   ├── e2e/                   # End-to-end test specifications
│   ├── fixtures/              # Test data and mock files
│   ├── pages/                 # Page Object Models
│   ├── selectors/            # Reusable selectors
│   └── support/              # Support files and commands
│
├── superwstest/               # WebSocket API test files
│   ├── test/                 # WebSocket test specifications
│   ├── utils/                # Utility functions and helpers
│   └── expected/             # Expected test results and fixtures
│
├── .babelrc                   # Babel configuration
├── jest.config.js            # Jest configuration
├── cypress.config.js         # Cypress configuration
├── package.json              # Test dependencies
├── package-lock.json         # Lock file for dependencies
└── README.md                 # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js) or Yarn (v1.22 or higher)

## Installation

1. Navigate to the test directory:
```bash
cd test
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

The following dependencies are required for running the tests:

```json
{
  "devDependencies": {
    "@babel/core": "^7.x",
    "@babel/preset-env": "^7.x",
    "babel-jest": "^29.x",
    "cypress": "^13.x",
    "jest": "^29.x",
    "supertest": "^6.x",
    "superwstest": "^2.x",
    "ws": "^8.x"
  }
}
```

## Running Tests

### Cypress Tests

1. Start the application server:
```bash
cd ../app
node server.js
```

2. In a new terminal, run Cypress tests:
Make sure that you target the folder "cd test" from the project root folder.

```bash
cd test
# Using npm
npx cypress run
# Or using Yarn
yarn cypress run
```

Or open Cypress Test Runner:
```bash
# Using npm
npx cypress open
# Or using Yarn
yarn cypress open
```

### WebSocket API Tests

1. Make sure the application server is running:
```bash
cd ../app
node server.js
```

2. In a new terminal, run the WebSocket tests:
```bash
cd test
# Using npm
npx jest superwstest/test/ws/
# Or using Yarn
yarn jest superwstest/test/ws/
```

## Test Structure

### Cypress Tests
- Located in: `cypress/e2e/`
- Uses Page Object Model (POM) pattern
- Tests the front-end functionality
- Implements custom commands in `support/`
- Uses fixtures for test data

### WebSocket Tests
- Located in: `superwstest/test/ws/`
- Tests both HTTP and WebSocket endpoints
- Verifies real-time data updates
- Uses utility functions from `utils/`
- Validates against expected results in `expected/`

## Configuration Files

- `jest.config.js`: Configuration for WebSocket tests
- `cypress.config.js`: Configuration for Cypress tests
- `.babelrc`: Babel configuration for ES modules

## Troubleshooting

1. If you see "port already in use" errors:
   - Make sure no other instance of the server is running
   - Check if port 3100 is available

2. If WebSocket tests fail:
   - Ensure the application server is running
   - Check if the server is accessible at `ws://localhost:3100`

3. If Cypress tests fail:
   - Verify the application is running
   - Check if the front-end is accessible at `http://localhost:5713`

# WebSocket Testing with superwstest

This project demonstrates how to test WebSocket connections using `superwstest`. The tests verify that the WebSocket server sends messages in the correct format, that CoinB's price increases over time, and that the inventory updates correctly after purchasing a coin.

## Setup

1. **Install Dependencies:**
   ```bash
   yarn install
   ```

2. **Start the WebSocket Server:**
   ```bash
   cd ../app
   node server.js
   ```

3. **Run the Tests:**
   ```bash
   cd ../test
   yarn jest superwstest/test/ws/
   ```

## Test Files

### 1. `payloadShape.test.js`
- **Purpose:** Verifies that the WebSocket server sends messages in the correct format.
- **Key Features:**
  - Uses a dynamic server instance from `wsClient.js`.
  - Includes beginner-friendly console logs to explain the test flow.

### 2. `priceIncrement.test.js`
- **Purpose:** Verifies that CoinB's price increases over time.
- **Key Features:**
  - Uses a dynamic server instance from `wsClient.js`.
  - Includes beginner-friendly console logs to show price updates.

### 3. `inventoryUpdate.test.js`
- **Purpose:** Verifies that the inventory updates correctly after purchasing a coin.
- **Key Features:**
  - Uses a dynamic server instance from `wsClient.js`.
  - Includes beginner-friendly console logs to show inventory changes.

## WebSocket Client (`wsClient.js`)

The `wsClient.js` file provides a dynamic way to connect to the WebSocket server:

```js
import request from 'superwstest';

const WS_BASE_URL = process.env.WS_BASE_URL || 'http://localhost:3100';

export const getServer = () => request(WS_BASE_URL);

export const connectToWS = (path = '/', wsOptions = {}) => {
  return getServer().ws(path, wsOptions);
};
```

- **`getServer()`:** Returns a dynamic server instance.
- **`connectToWS()`:** Connects to the WebSocket server with optional path and options.

## Environment Variables

You can configure the WebSocket server URL using the `WS_BASE_URL` environment variable:

```bash
WS_BASE_URL="http://myserver:4000" yarn jest superwstest/test/ws/
```

## Example Output

When running the tests, you'll see console logs like:

```
Starting payload shape test...
Connected to WebSocket server
Received data: { coins: [...], inventory: [...], time: 0 }
Test passed! Data format is correct

Starting price increment test...
Connected to WebSocket server
Received price update for CoinB: $100
Test passed! CoinB price is increasing as expected

Starting inventory update test...
Connected to WebSocket server
Initial CoinB amount: 0
Sending purchase request for 1 CoinB...
Updated CoinB amount: 1
Test passed! CoinB amount increased by 1
```

## Further Improvements

- Add more tests for other WebSocket scenarios.
- Enhance error handling and logging.
- Integrate with CI/CD pipelines.