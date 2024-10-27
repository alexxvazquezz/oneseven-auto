const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.url = 'https://login.mailchimp.com';
        this.loginHeader = page.locator('h1.text-align--center.google-sso-login-form-heading');
        this.createAccountLink = page.locator('#create-account-link');
     }
    
     async navigateToLoginPage() {
        // await for anh ongoing actions. 
        await this.page.goto(this.url);
     }

     async clicOnCreateAccount() {
        await this.createAccountLink.click();
     }

     
}

