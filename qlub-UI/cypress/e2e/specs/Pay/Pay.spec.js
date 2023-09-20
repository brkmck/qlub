///<reference types="cypress" />


describe('Pay test cases', function() {
    var testData;

    beforeEach(function () {
        cy.fixture('data.json').then(function(regdata){
            testData = regdata;
            return testData;
        })
    })

    const getIframeDocument = () => {
        return cy
        .get('iframe')
        // Cypress yields jQuery element, which has the real
        // DOM element under property "0".
        // From the real DOM iframe element we can get
        // the "document" element, it is stored in "contentDocument" property
        // Cypress "its" command can access deep properties using dot notation
        // https://on.cypress.io/its
        .its('0.contentDocument').should('exist')
      }
      
      const getIframeBody = () => {
        // get the document
        return getIframeDocument()
        // automatically retries until body is loaded
        .its('body').should('not.be.undefined')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        .then(cy.wrap)
      }
    
    it('Split and Pay The Bill', () => {
        //Visiting the payment page
        cy.visit('/');

        //Splitting the bill
        cy.get('.MuiButton-contained').click();
        cy.get('.MuiButton-containedLight').click();
        cy.get('#select-custom').click();
        cy.get('#fullWidth').clear().type('10');
        cy.get('#split-bill').click();

        //Select tip
        cy.get('#tip_5 > .css-hk5mkc').click();

        //Typing card info
        cy.iframe('#cardNumber').find('#checkout-frames-card-number').should('be.visible').click().type(testData.cardNo);
        cy.iframe('#expiryDate').find('#checkout-frames-expiry-date').should('be.visible').click().type(testData.expireDate);
        cy.iframe('#cvv').find('#checkout-frames-cvv').should('be.visible').click().type(testData.cvv);

        //Paying
        cy.get('#checkout-action-btn').click();
        cy.wait(5000);
        cy.enter().then(getBody => {
            getBody().find('#password').should('be.visible').click().type('Checkout1!');
            getBody().find('#txtButton').should('be.visible').click();
          })

        //Checking if payment is success
        cy.get('.css-1dbb4wf').should('have.text', 'Payment was successful!');
    })
})