const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      
    },
    baseUrl: 'https://app-staging.qlub.cloud/qr/ae/dummy-checkout/90/_/_/1827c10c80',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
  video: false,
  viewportWidth: 1280,
  viewportHeight: 800
})
