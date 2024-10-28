// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
   testDir: './tests',
   timeout: 30 * 1000,
   /* Run tests in files in parallel */
   fullyParallel: true,
   /* Fail the build on CI if you accidentally left test.only in the source code. */
   forbidOnly: !!process.env.CI,
  
 
   /* Opt out of parallel tests on CI. */
   workers: process.env.CI ? 2 : 1,
   /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  use: {
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */


  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' }, // Use Chromium
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' }, // Use Firefox
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit' }, // Use WebKit (Safari)
    },
  ],
  
  // Reporters configuration
  reporter: [
    ['html', { outputFolder: 'reports/playwright-html-report', open: 'never' }],
    ['json', { outputFile: 'reports/playwright-report.json' }],
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

