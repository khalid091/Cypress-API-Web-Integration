# Cypress Assessment Project

This project consists of two main components: a web application and its test suite. Each component has its own dependencies and setup.

## Project Structure

```
cypress-assessment/
├── app/                    # Main application code
│   ├── node_modules/      # Application dependencies
│   ├── package.json       # Application package configuration
│   ├── server.js          # Express server implementation
│   └── README.md          # Application setup instructions
│
├── test/                   # Test suite
│   ├── node_modules/      # Test dependencies
│   ├── package.json       # Test package configuration
│   ├── cypress/           # Cypress E2E tests
│   │   ├── e2e/          # End-to-end test specifications
│   │   ├── fixtures/     # Test data and mock files
│   │   ├── pages/        # Page Object Models
│   │   ├── selectors/    # Reusable selectors
│   │   └── support/      # Support files and commands
│   │
│   ├── superwstest/      # WebSocket API tests
│   │   ├── test/        # WebSocket test specifications
│   │   └── utils/       # WebSocket utilities
│   │
│   └── README.md         # Test setup instructions
│
└── README.md              # This file
```

## Components

### 1. Application (app/)
- **Type**: Express.js Web Application
- **Purpose**: Main application server
- **Features**:
  - REST API endpoints
  - WebSocket server for real-time updates
  - Coin trading functionality
- **Dependencies**: express, cors, ws
- **Setup**: See app/README.md

### 2. Test Suite (test/)
- **Type**: Automated Testing Framework
- **Components**:
  - Cypress E2E Tests
  - WebSocket API Tests
  - REST API Tests
- **Dependencies**: cypress, jest, supertest, superwstest
- **Setup**: See test/README.md

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or Yarn

### Application Setup
```bash
cd app
npm install
# or
yarn install
```

### Test Suite Setup
```bash
cd test
npm install
# or
yarn install
```

## Running the Project

1. Start the application:
```bash
cd app
npm start
# or
yarn start
```

2. Run tests:
```bash
cd test
# Run all tests
npm test
# or
yarn test

# Run specific test suites
npm run test:ws
# or
yarn test:ws
```

## Key Features

### API Endpoints
- REST API for coin trading operations
- WebSocket server for real-time price updates
- Inventory management system

### Testing
- End-to-end testing with Cypress
- WebSocket testing with superwstest
- API testing with supertest
- Jest for test running and assertions

## Notes
- Each directory (app/ and test/) has its own `package.json` and `node_modules`
- Dependencies are managed separately for better isolation
- See individual README files in each directory for detailed setup instructions 