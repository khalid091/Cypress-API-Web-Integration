# Cypress Assessment Project - Test Suite

This project contains the test suite for the web application, including Cypress E2E tests and WebSocket API tests.

## Test Suite Structure

```
test/
├── node_modules/      # Test dependencies
├── package.json       # Test package configuration
├── cypress/           # Cypress E2E tests
│   ├── e2e/          # End-to-end test specifications
│   ├── fixtures/     # Test data and mock files
│   ├── pages/        # Page Object Models
│   ├── selectors/    # Reusable selectors
│   └── support/      # Support files and commands
│
├── superwstest/      # WebSocket API tests
│   ├── test/        # WebSocket test specifications
│   └── utils/       # WebSocket utilities
│
└── README.md         # Test setup instructions
```

## Dependencies

### Required Node Modules
- cypress: ^12.0.0 (E2E testing framework)
- jest: ^29.0.0 (Test runner and assertions)
- supertest: ^6.0.0 (HTTP API testing)
- superwstest: ^2.0.0 (WebSocket API testing)
- @cypress/xpath: ^2.0.0 (XPath support for Cypress)
- cypress-file-upload: ^5.0.0 (File upload testing)
- cypress-real-events: ^1.7.0 (Real browser events simulation)

### Installation
```bash
cd test
npm install
# or
yarn install
```

## Testing Guide

### Cypress Web Automation Testing

1. **Setup**
   - Ensure the main application is running
   - Cypress tests are located in `cypress/e2e/`
   - Page objects are in `cypress/pages/`
   - Selectors are centralized in `cypress/selectors/`

2. **Running Tests**
   ```bash
   # Open Cypress Test Runner
   npx cypress open

   # Run tests headlessly
   npx cypress run

   # Run specific test file
   npx cypress run --spec "cypress/e2e/specific-test.cy.js"
   ```

3. **Test Structure**
   - Tests are written in JavaScript
   - Uses Page Object Model pattern
      - pages folder where the methods are stored in the class
      - e2e folder where the methods become test steps for execution.
   - Supports custom commands in `cypress/support/`

### WebSocket Testing (superwstest)

1. **Setup**
   - WebSocket tests are located in `superwstest/test/`
   - Utilities and helpers in `superwstest/utils/`

2. **Running Tests**
  Make sure that you target the "cd test" from project root folder

   ```bash
   # Run all WebSocket tests
   npm run test:ws

   # Run specific WebSocket test file
   npm run test:ws -- test/specific-ws-test.js
   ```

3. **Test Structure**
   - Tests use superwstest for WebSocket connections
   - Supports real-time message testing
   - Can test connection events and message handling
   - Includes utilities for WebSocket connection management

## Best Practices

1. **Cypress Tests**
   - Use page objects for better maintainability
   - Keep selectors in dedicated files
   - Implement custom commands for common operations

2. **WebSocket Tests**
   - Test connection establishment
   - Verify message formats
   - Test error handling
   - Validate real-time updates

## Notes
- Ensure the main application is running before executing tests
- Check individual test files for specific setup requirements
- Follow the established naming conventions for test files 
