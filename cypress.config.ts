import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  watchForFileChanges: false,
  waitForAnimations: true,
  numTestsKeptInMemory: 30,
  defaultCommandTimeout: 15000,
  requestTimeout: 15000,
  blockHosts: [
    "static.hotjar.com",
    "google-analytics.com/",
    "sjs.bizographics.com/",
    "googleadservices.com/",
    "connect.facebook.net/",
    "stats.pusher.com",
    "js.intercomcdn.com",
    "stats.pusher.com",
  ],
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  },
});
