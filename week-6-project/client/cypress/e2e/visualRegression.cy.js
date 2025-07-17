import 'cypress-image-snapshot/command';

describe('Visual Regression Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Home page should match previous snapshot', () => {
    cy.document().toMatchImageSnapshot();
  });

  it('FormComponent should match snapshot', () => {
    cy.visit('http://localhost:3000/form');
    cy.get('form').toMatchImageSnapshot();
  });
});
