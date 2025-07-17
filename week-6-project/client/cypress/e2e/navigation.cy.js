describe('Navigation and Routing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should navigate to About page', () => {
    cy.get('a[href="/about"]').click();
    cy.url().should('include', '/about');
    cy.contains('About Us').should('be.visible');
  });

  it('should navigate to Contact page', () => {
    cy.get('a[href="/contact"]').click();
    cy.url().should('include', '/contact');
    cy.contains('Contact').should('be.visible');
  });

  it('should handle 404 for unknown routes', () => {
    cy.visit('http://localhost:3000/unknown', { failOnStatusCode: false });
    cy.contains('Page Not Found').should('be.visible');
  });
});
