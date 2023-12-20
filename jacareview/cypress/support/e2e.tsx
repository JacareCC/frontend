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
        
     // Intercept the sign-in request and respond with a successful authentication
     cy.intercept('POST', '**/identitytoolkit.googleapis.com/**', {
       statusCode: 200,
       body: {
         localId: 'mockUserId',
         idToken: 'mockIdToken',
         refreshToken: 'mockRefreshToken',
       },
     }).as('signInResponse');
    
     // Click the Google sign-in button
     cy.get('button:contains("Continue With Google")').click();
    
     // Wait for the sign-in request to complete
     cy.wait('@signInRequest').then((interception) => {
       // Add additional assertions based on the sign-in request if needed
       expect(interception.response?.statusCode).to.equal(200);
     });
    
     // Wait for the sign-in response to complete
     cy.wait('@signInResponse').then((interception) => {
       // Add additional assertions based on the sign-in response if needed
       const responseBody = interception.response?.body;
       expect(responseBody.localId).to.equal('mockUserId');
       expect(responseBody.idToken).to.equal('mockIdToken');
       expect(responseBody.refreshToken).to.equal('mockRefreshToken');
     });
    
     // Assert that the user is redirected to the search page after successful sign-in
     cy.url().should('include', '/search');
  
    });
  });