describe('Home Page', () => {
    it('should render the home page and sign in with Google', () => {
      // Visit the home page
      cy.visit('/');

      //cookie button exists
      cy.get('button:contains("Accept")');

      //cookie is accepted
      cy.get('button:contains("Accept")').click();

     cy.intercept('POST', '**/identitytoolkit.googleapis.com/**').as('signInRequest');

     // Check if the Google sign-in button is present
     cy.get('button:contains("Continue With Google")').should('exist');
    
     // Click the Google sign-in button
     cy.get('button:contains("Continue With Google")').click();

     // Login with firebase
cy.login()
    
     // Assert that the user is redirected to the search page after successful sign-in
     cy.url().should('include', '/search');
  
    });
  });

