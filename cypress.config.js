const { defineConfig } = require("cypress");

module.exports = defineConfig({

  video:false,
  screenshotOnRunFailure: false,

  e2e: {

    urlAtiv21: 'https://the-internet.herokuapp.com',
    urlAtiv22: 'https://jsonplaceholder.typicode.com',

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
