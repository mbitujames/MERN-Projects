describe('App E2E', () => {
  it('loads the home page', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Welcome');
  });
});