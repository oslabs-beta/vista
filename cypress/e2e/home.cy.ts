const apiUrl = 'https://rickandmortyapi.com/graphql';

// This code will run once before any tests in the describe block
beforeEach(() => {
  cy.visit('/').then(() => {
    cy.get('input[name="endpoint-url"]').type(apiUrl);
    cy.get('[data-testid="endpoint-form"]').submit();
  });
});

describe('e2e Test for Vista', () => {
 
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
  it('Should render a field and character node on the DOM', () => {
    // Check to see that the nodes with the data-testid attributes have rendered
    cy.get('.react-flow').should('exist');
    cy.get('[data-testid="rf__node-id_fieldCharacter_parent"]').should('exist');
    cy.get('[data-testid="rf__node-locations"]').should('exist');
    cy.get('[data-testid="rf__node-Character"]').should('exist');
  });

  // Check that the field(s) clicked on render in the query generator correctly
  it('Should update the query generator based on the fields clicked', () => {
    cy.get('[data-testid="query-generator"]').should('exist');
    cy.get('[data-testid="rf__node-id_fieldCharacter_parent"]').click();
    cy.contains('query { character { id } }').should('exist');
    cy.get('[data-testid="rf__node-type_fieldLocation_parent"]').click();
    cy.contains('query { character { id } location { type } }').should('exist');
  });

  // Have user successfully sign in and sign out with their own credentials
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
  it('Should successfully log out the user to the application using their own credentials', () => {
    cy.get('[data-testid="account-button"]').should('exist');
    cy.get('[data-testid="account-button"]').click();
    cy.get('[data-testid="sign-out-button"]').should('exist');
    cy.get('[data-testid="sign-out-button"]').click();
    cy.get('[data-testid="account-button"]').should('exist');
    cy.get('[data-testid="account-button"]').click();
    cy.get('[data-testid="sign-in-button"]').should('exist');
  })
  
});

