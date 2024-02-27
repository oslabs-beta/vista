const apiUrl = 'https://rickandmortyapi.com/graphql'

// This code will run once before each test in the describe block
beforeEach(() => {
  cy.visit('/').then(() => {
    cy.get('input[name="endpoint-url"]').type(apiUrl)
    cy.get('[data-testid="endpoint-form"]').submit()
  })
})

describe('e2e Test for Vista', () => {
  // Have user successfully sign in with their own credentials
  it('Should successfully log in the user to the application using their own credentials', () => {
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

  it('Should render a root and fields node on the DOM', () => {
    // Check to see that the nodes with the data-testid attributes have rendered
    cy.get('.react-flow').should('exist')
    // test if Root Query node exists
    cy.get('[data-testid="rf__node-query"]').should('exist')
    // test if node 'fields' exist
    cy.get('[data-testid="rf__node-fields"]').should('exist')
  })

  // Check that the field(s) clicked on render in the query generator correctly
  it('Should update the query generator based on the fields clicked and run the query', () => {
    cy.get('[data-testid="query-generator"]').should('exist')

    cy.get('[data-testid="rf__node-character"]').click()
    cy.contains('query { character (id: "") }').should('exist')

    cy.get('[data-testid="rf__node-id_argument_character_parent"]')
      .children('div')
      .children('div.flex-1')
      .children('input')
      .type('1')
    cy.contains('query { character (id: "1") }').should('exist')

    cy.get('[data-testid="rf__node-name_field_character_parent"]').click()
    cy.contains('query { character (id: "1") { name } }').should('exist')

    cy.get('[data-testid="queryResult_runQuery_button"]').click()
    cy.contains('{ "character": { "name": "Rick Sanchez" } }').should('exist')

    cy.get('[data-testid="queryGenerator_saveQuery"]').click()
    cy.contains('store this query so you can reference it later').should(
      'exist',
    )

    const time = Date.now()
    const now = new Date(time)
    cy.get('[data-testid="saveQuery_queryName"]').type(
      `test-${now.toISOString()}`,
    )
    cy.get('[data-testid="button_saveQuery_saveQueryButton"]').click()
    cy.contains('Query Saved To The Database').should('exist')
  })

  // Have user successfully sign out
  it('Should successfully log out the user to the application using their own credentials', () => {
    // custom command
    cy.login('steph@dangernoodles.com', '123456789')

    // logout
    cy.get('[data-testid="account-button"]').should('exist')
    cy.get('[data-testid="account-button"]').click()
    cy.get('[data-testid="sign-out-button"]').should('exist')
    cy.get('[data-testid="sign-out-button"]').click()
    cy.get('[data-testid="account-button"]').should('exist')
    cy.get('[data-testid="account-button"]').click()
    cy.get('[data-testid="sign-in-button"]').should('exist')
    cy.get('[data-testid="account-button"]').click()
  })
})
