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
npx jest superwstest/test/test.js
# Or using Yarn
yarn jest superwstest/test/test.js
```

## Test Structure

### Cypress Tests
- Located in: `cypress/e2e/`
- Uses Page Object Model (POM) pattern
- Tests the front-end functionality

### WebSocket Tests
- Located in: `superwstest/test/`
- Tests both HTTP and WebSocket endpoints
- Verifies real-time data updates

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