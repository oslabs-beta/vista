describe('GraphQL Query', () => {
  it('should make a successful GraphQL query', () => {
    const apiUrl = 'https://rickandmortyapi.com/graphql'; 
    
    cy.visit('/');

    // Enter the API endpoint URL & submit it
    cy.get('input[name="endpoint-url"]').type(apiUrl);
    cy.get('[data-testid="endpoint-form"]').submit();
  
    // Check for the nodes with the data-testid attributes
    cy.get('.react-flow').should('exist');
    cy.get('[data-testid="rf__node-id_fieldCharacter_parent"]').should('exist');
    cy.get('[data-testid="rf__node-locations"]').should('exist');
    cy.get('[data-testid="rf__node-Character"]').should('exist');
  })
});