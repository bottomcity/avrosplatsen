const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://test.keysourcingtool.com/',

      chromeWebSecurity: false
      },
});
