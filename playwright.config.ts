import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: {
    timeout: 30000
  },
  use: {
    headless: false,
        navigationTimeout: 60000, // час на перехід на іншу сторінку
        actionTimeout: 30000, // час на дію (click, fill, type, etc.)
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    baseURL: 'https://store.cpanel.net/store/cpanel-licenses'
    
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] }
    // }
  ]
});