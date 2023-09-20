import { config } from 'rxjs';
import './commands';
import '../../node_modules/cypress-xpath';

// Alternatively you can use CommonJS syntax:
// require('./commands')
before(() => {
    
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })
