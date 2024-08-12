describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://newsapi.org/v2/everything?q=Apple&from=2024-07-15&sortBy=date&apiKey=0a88f1e8d3f94c04b29a691c09005e02', {
      statusCode: 201,
      fixture: 'articles.json'
    })
    cy.visit('http://localhost:3000/article/The%20Top%209%20Prime%20Day%20Apple%20Deals%20on%20Our%20Favorite%20Gadgets%20(2024)')
  })
  it('Should contain a single article with content', () => {
    cy.get('.singleWrapper .singleTitle').should('contain', 'The Top 9 Prime Day Apple Deals on Our Favorite Gadgets (2024)');
    cy.get('.singleWrapper .firstSection img').should('exist');
    cy.get('.singleWrapper .secondSection ')
  })
  it('Should have a resource button for the original article link', () => {
    cy.get('.singleArticle .toSourceButton').should('be.visible')
  })
  it('Should take you back to the articles page', () => {
    cy.wait(1000);
    cy.get('.backLink').click()
    cy.url().should('contain', '/')
  })
})