const { Before, After, setDefaultTimeout, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { firefox, chromium } = require('@playwright/test');
const config = require('../../playwright.config');
const { env } = require('process');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const { faker }  = require('@faker-js/faker');
const MailSlurp = require('mailslurp-client').default


const envPath = path.join(__dirname, '../../.env');
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const mailslurp = new MailSlurp({ apiKey: envConfig.MAILSLURP_API_KEY});

let browser;
let context;

setDefaultTimeout(60 * 1000);

BeforeAll(async function() {
  try {

    // Generate a randome email for username
    const username = faker.internet.email();

    // Create new inbox
    const inbox = await mailslurp.createInbox();
   
    // Update key in .env
    envConfig.INBOX_ID = inbox.id;
    envConfig.EMAIL_ADDRESS = inbox.emailAddress;
    envConfig.USERNAME = username;

    const updatedEnv = Object.keys(envConfig) 
      .map(key => `${key}=${envConfig[key]}`)
      .join('\n');
    fs.writeFileSync(envPath, updatedEnv)

    process.env.INBOX_ID = inbox.id;
    process.env.EMAIL_ADDRESS = inbox.emailAddress;
    process.env.USERNAME = username;

  } catch (error) {
    console.error("Error creating inbox", error.message);
  };

})


Before(async function() {
  // Lauches browser for each new test
  browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox']
  }); 

  context = await browser.newContext();

  this.page = await context.newPage();
});

After(async function(scenario) {
  try {
      if (scenario.result.status === 'FAILED') {
        const screenshotPath = path.resolve(`./reports/screenshots/${Date.now()}.png`);
        
        await this.page.screenshot({ path: screenshotPath });
        
        scenario.attach(screenshotPath, 'image/png');
      }
  } catch (error) {
      console.error("Error taking screenshot:", error.message); 
  } finally {
    if (this.page && this.page.isClosed() === false) {
      await this.page.close();
    }
  if (context) {
      await context.close();
    }
  if (browser) {
    await browser.close();
    }
  }
});


module.exports = { context };
