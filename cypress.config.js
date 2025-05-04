// cypress.config.js
import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: "uih8o1",
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // nič netreba
    },
  },
})
