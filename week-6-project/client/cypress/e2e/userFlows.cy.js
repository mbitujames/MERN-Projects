describe('Critical User Flows', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should register a new user', () => {
    cy.contains('Register').click();
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('Password123!');
    cy.get('button[type="submit"]').click();
    cy.contains('Registration successful').should('be.visible');
  });

  it('should login an existing user', () => {
    cy.contains('Login').click();
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('Password123!');
    cy.get('button[type="submit"]').click();
    cy.contains('Welcome, testuser').should('be.visible');
  });

  it('should create a new post', () => {
    cy.contains('New Post').click();
    cy.get('input[name="title"]').type('My First Post');
    cy.get('textarea[name="content"]').type('This is the content of my first post.');
    cy.get('button[type="submit"]').click();
    cy.contains('Post created successfully').should('be.visible');
  });

  it('should edit a post', () => {
    cy.contains('My First Post').click();
    cy.contains('Edit').click();
    cy.get('textarea[name="content"]').clear().type('Updated content.');
    cy.get('button[type="submit"]').click();
    cy.contains('Post updated successfully').should('be.visible');
  });

  it('should delete a post', () => {
    cy.contains('My First Post').click();
    cy.contains('Delete').click();
    cy.contains('Post deleted successfully').should('be.visible');
  });
});
