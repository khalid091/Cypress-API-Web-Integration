/// <reference types="cypress" />

// Custom command to visit and wait for page load
Cypress.Commands.add('visitAndWaitForLoad', (url = '/') => {
    cy.visit(url, { timeout: 30000 });
    cy.document().should('have.property', 'readyState', 'complete');
    cy.wait(1000);
});

// Custom command to find element with retry and timeout
Cypress.Commands.add('findElement', (selector, options = {}) => {
    const defaultOptions = {
        timeout: 10000,
        retries: 3,
        ...options
    };

    return cy.get(selector, { timeout: defaultOptions.timeout })
        .should('exist')
        .should('be.visible');
});

// Custom command to enter text with validation
Cypress.Commands.add('enterText', { prevSubject: 'element' }, (subject, text, options = {}) => {
    const defaultOptions = {
        clear: true,
        force: false,
        ...options
    };

    return cy.wrap(subject)
        .should('be.visible')
        .should('be.enabled')
        .then($el => {
            if (defaultOptions.clear) {
                cy.wrap($el).clear();
            }
            cy.wrap($el).type(text, { force: defaultOptions.force });
        });
});

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', (options = {}) => {
    const defaultOptions = {
        timeout: 30000,
        ...options
    };

    cy.window().should('have.property', 'document')
        .and('have.property', 'readyState', 'complete');

    cy.intercept('**/*').as('allRequests');
    cy.wait('@allRequests', { timeout: defaultOptions.timeout });
});

// Custom command for explicit wait
Cypress.Commands.add('waitForElement', (selector, options = {}) => {
    const defaultOptions = {
        timeout: 10000,
        state: 'visible',
        ...options
    };

    return cy.get(selector, { timeout: defaultOptions.timeout })
        .should('be.' + defaultOptions.state);
});

// Custom command to wait for element to be clickable
Cypress.Commands.add('waitForClickable', (selector, options = {}) => {
    const defaultOptions = {
        timeout: 10000,
        ...options
    };

    return cy.get(selector, { timeout: defaultOptions.timeout })
        .should('be.visible')
        .should('be.enabled');
});

// Custom command to wait for element to disappear
Cypress.Commands.add('waitForElementToDisappear', (selector, options = {}) => {
    const defaultOptions = {
        timeout: 10000,
        ...options
    };

    return cy.get(selector, { timeout: defaultOptions.timeout })
        .should('not.exist');
});

// Custom command to wait for specific text
Cypress.Commands.add('waitForText', (selector, text, options = {}) => {
    const defaultOptions = {
        timeout: 10000,
        ...options
    };

    return cy.get(selector, { timeout: defaultOptions.timeout })
        .should('contain', text);
}); 

// Custom command to wait for element to be clickable with a 1-second delay
Cypress.Commands.add('waitAndClick', { prevSubject: 'element' }, (subject, options = {}) => {
    const defaultOptions = {
        timeout: 10000, // Default timeout of 10 seconds
        ...options
    };

    return cy.wrap(subject)
        .should('exist') // Validates that the element exists in the DOM
        .should('be.visible') // Validates that the element is visible
        .should('be.enabled') // Validates that the element is not disabled
        .click() // Performs the click action
        .wait(1000); // Waits for 1 second (1000 milliseconds)
});