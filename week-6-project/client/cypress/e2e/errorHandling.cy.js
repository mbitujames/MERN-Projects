describe('Error Handling and Edge Cases', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('displays error message on failed login', () => {
    cy.contains('Login').click();
    cy.get('input[name="email"]').type('wronguser@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('handles server error gracefully on post creation', () => {
    cy.intercept('POST', '/api/posts', {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('createPostError');

    cy.contains('New Post').click();
    cy.get('input[name="title"]').type('Test Post');
    cy.get('textarea[name="content"]').type('Test content');
    cy.get('button[type="submit"]').click();

    cy.wait('@createPostError');
    cy.contains('Failed to create post').should('be.visible');
  });

  it('shows 404 page for non-existent routes', () => {
    cy.visit('http://localhost:3000/non-existent', { failOnStatusCode: false });
    cy.contains('Page Not Found').should('be.visible');
  });
});
