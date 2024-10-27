const { expect } = require('@playwright/test');


exports.HomePage = class HomePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.url = 'https://mailchimp.com/';
        this.loginButton = 'text=Log In';
     }
    
     async navigateToHomePage() {
        await this.page.goto(this.url);
     }

     async clickLogin() {
      await this.page.click(this.loginButton);
     }
}

