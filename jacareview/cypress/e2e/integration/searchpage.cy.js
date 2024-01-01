// cypress/integration/searchPage.spec.js
import VerifyUser from "../../../app/globalfunctions/TokenVerification";

describe("SearchPage testing", () => {
  it("should handle authentication success", () => {
    cy.visit("/search", {
      onBeforeLoad(win) {
        cy.stub(
          win.navigator.geolocation,
          "getCurrentPosition",
          (success, error, options) => {
            // Mock the desired geolocation coordinates
            const position = {
              coords: {
                latitude: 35.662,
                longitude: 139.7038,
                accuracy: 10,
              },
            };
            success(position);
          }
        );
      },
    });

    const test_uid = Cypress.env("test_uid");

    // Use cy.wrap to handle the asynchronous behavior
    cy.window().then((win) => {
      cy.wrap({ VerifyUser }).invoke(
        "VerifyUser",
        test_uid,
        win.setStateFunction
      );
    });

    // Continue with the rest of your test
    cy.get('button:contains("One JacaRestaurant")').should("exist");
    cy.get('button:contains("Three JacaRestaurants")').should("exist");
    cy.get('button:contains("$")').should("exist");
    cy.get('button:contains("$$")').should("exist");
    cy.get('button:contains("$$$")').should("exist");
    cy.get('button:contains("$$$$")').should("exist");
    cy.get('button:contains("Vegan")').should("exist");
    cy.get('button:contains("Vegetarian")').should("exist");

    //Vegan and vegetarian option should change to green when clicked
    cy.get('button:contains("Vegan")').click();
    cy.get('button:contains("Vegan")').should("have.class", "bg-jgreen");
    cy.get('button:contains("Vegetarian")').click();
    cy.get('button:contains("Vegetarian")').should("have.class", "bg-jgreen");

    //Vegan option should change back to gray when clicked
    cy.get('button:contains("Vegan")').click();
    cy.get('button:contains("Vegan")').should("have.class", "bg-gray-300");
    cy.get('button:contains("Vegetarian")').click();
    cy.get('button:contains("Vegetarian")').should("have.class", "bg-gray-300");

    cy.get('button:contains("Three JacaRestaurants")').click();
    // Wait for the loading animation and slide show to be visible

    cy.get('[data-testid="slide-show"]').should("be.visible");
  });
});
