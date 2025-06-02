import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // events here
    },
    baseUrl: 'http://localhost:5173',
  },
})
