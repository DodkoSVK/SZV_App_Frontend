import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement event listeners here
    },
    baseUrl: 'http://localhost:5173'
  },
})
