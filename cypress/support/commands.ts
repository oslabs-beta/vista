/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/')
  cy.get('[data-testid="account-button"]').should('exist')
  cy.get('[data-testid="account-button"]').click()
  cy.get('[data-testid="sign-in-button"]').should('exist')
  cy.get('[data-testid="sign-in-button"]').click()
  cy.get('[data-testid="username-input"]').should('exist')
  cy.get('[data-testid="username-input"]').type('steph@dangernoodles.com')
  cy.get('[data-testid="password-input"]').should('exist')
  cy.get('[data-testid="password-input"]').type('123456789')
  cy.contains('Sign in with Credentials').click()
  cy.get('[data-testid="endpoint-form"]').should('exist')
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>
  }
}
