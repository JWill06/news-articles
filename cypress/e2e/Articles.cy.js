describe('Tests the Articles', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://newsapi.org/v2/everything?q=Apple&from=2024-07-15&sortBy=date&apiKey=0a88f1e8d3f94c04b29a691c09005e02', {
      statusCode: 200,
      fixture: 'articles.json'
    })
    cy.visit('http://localhost:3000')
  })
  it('Should have a lenght of 3 articles', () => {
    cy.get('.articleWrapper').should('have.length', '3')
  })
  it('Should have content displayed', () => {
    cy.get('.articleWrapper h1').should('exist');
    cy.get('.articleWrapper h2').should('exist');
    cy.get('.articleWrapper h3').should('exist');
    cy.get('.articleWrapper img').should('exist');
    cy.get('.articleWrapper .moreDetails').should('exist');
  })
  it('Should have a search feature', () => {
    cy.get('.filterInputs .authorFilter').should('be.visible')
  })
  it('Should filter out articles and have a length of 2', () => {
    cy.get('input[name="search"]').type('2024')
    cy.get('.articleWrapper').should('have.length', '2')
    cy.wait(3000)
  })
  it('Should return a message if nothing matches the search', () => {
    cy.get('input[name="search"]').type('40')
    cy.get('.displayingPages').should('contain', 'Nothing to display, try a different search!')
    cy.wait(3000)
  })
  it('Should take you to a detailed page', () => {
    cy.wait(3000)
    cy.get(':nth-child(2) > .article > .moreDetails').click();
    cy.wait(1000)
    cy.url().should('contain', 'article/The%20Top%205%20Prime%20Day%20Apple%20Deals%20on%20Our%20Favorite%20Gadgets%20(2024)')
  })
  it('Should take you back to the articles page', () => {
    cy.visit('http://localhost:3000/article/The%20Top%209%20Prime%20Day%20Apple%20Deals%20on%20Our%20Favorite%20Gadgets%20(2024)')
    cy.wait(1000);
    cy.get('.backLink').click()
    cy.url().should('contain', '/')
  })
})