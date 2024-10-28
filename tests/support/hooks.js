const { Before, After, setDefaultTimeout, BeforeAll } = require('@cucumber/cucumber');
const { firefox, chromium, webkit } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const { faker }  = require('@faker-js/faker');
const MailSlurp = require('mailslurp-client').default


const envPath = path.join(__dirname, '../../.env');
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const mailslurp = new MailSlurp({ apiKey: envConfig.MAILSLURP_API_KEY});
const isHeadleass = process.env.HEADLESS === 'true';

dotenv.config();

let context;
let page;
let browser;

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
  const browserName = process.env.BROWSER;
  
  // Lauches browser for each new test
  switch (browserName) {
    case 'chromium':
      browser = await chromium.launch({ headless: isHeadleass });
      break;
    case 'firefox':
      browser = await firefox.launch({ headless: isHeadleass });
      break;
    case 'webkit':
      browser = await webkit.launch({ headless: isHeadleass });
      break;
    default:
      throw new Error(`Unsupported browser: ${browserName}`);
  }

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
