describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://newsapi.org/v2/everything?q=Apple&from=2024-07-15&sortBy=date&apiKey=0a88f1e8d3f94c04b29a691c09005e02', {
      statusCode: 200,
      fixture: 'articles.json'
    })
    cy.visit('http://localhost:3000')
  })
  it('Has header content', () => {
    cy.get('.navWrapper h1').should('contain', 'Apple News Article Outlet')
  })
  it('Should have a background image', () => {
    cy.get('.navWrapper').should($el => {
      const style = window.getComputedStyle($el[0]);
      expect(style.backgroundImage).to.not.be.empty;
    });
  })
})