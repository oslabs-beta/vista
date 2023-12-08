const apiUrl = 'https://rickandmortyapi.com/graphql';


// This code will run once before each test in the describe block
beforeEach(() => {
  cy.visit('/').then(() => {
    cy.get('input[name="endpoint-url"]').type(apiUrl);
    cy.get('[data-testid="endpoint-form"]').submit();
  });
});

describe('e2e Test for Vista', () => {
  
  // Have user successfully sign in with their own credentials
  it('Should successfully log in the user to the application using their own credentials', () => {
    cy.get('[data-testid="account-button"]').should('exist');
    cy.get('[data-testid="account-button"]').click();
    cy.get('[data-testid="sign-in-button"]').should('exist');
    cy.get('[data-testid="sign-in-button"]').click();
    cy.get('[data-testid="username-input"]').should('exist');
    cy.get('[data-testid="username-input"]').type('steph@dangernoodles.com');
    cy.get('[data-testid="password-input"]').should('exist');
    cy.get('[data-testid="password-input"]').type('123456789')
    cy.contains('Sign in with Credentials').click()
    cy.get('[data-testid="endpoint-form"]').should('exist');
  })
  
  it('Should render a root and fields node on the DOM', () => {
    // Check to see that the nodes with the data-testid attributes have rendered
    cy.get('.react-flow').should('exist');
    // test if Root Query node exists
    cy.get('[data-testid="rf__node-query"]').should('exist');
    // test if node 'fields' exist
    cy.get('[data-testid="rf__node-fields"]').should('exist');
  });

  // Check that the field(s) clicked on render in the query generator correctly
  it('Should update the query generator based on the fields clicked', () => {
    cy.get('[data-testid="query-generator"]').should('exist');
    cy.get('[data-testid="rf__node-characters"]').click();
    cy.contains('query { characters }').should('exist');
    cy.get('[data-testid="rf__node-info_field_characters_parent"]').click();
    cy.contains('query { characters { info } }').should('exist');
  });

  
  // Have user successfully sign out
  xit('Should successfully log out the user to the application using their own credentials', () => {
    // custom command
    cy.login('steph@dangernoodles.com','123456789');

    // logout
    cy.get('[data-testid="account-button"]').should('exist');
    cy.get('[data-testid="account-button"]').click();
    cy.get('[data-testid="sign-out-button"]').should('exist');
    cy.get('[data-testid="sign-out-button"]').click();
    cy.get('[data-testid="account-button"]').should('exist');
    cy.get('[data-testid="account-button"]').click();
    cy.get('[data-testid="sign-in-button"]').should('exist');
    cy.get('[data-testid="account-button"]').click();
  })
  
});

