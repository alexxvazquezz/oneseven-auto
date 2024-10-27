const { expect } = require('@playwright/test');
require('dotenv').config();


exports.LoginPage = class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.url;
        this.loginHeader = page.locator('h1.text-align--center.google-sso-login-form-heading');
        this.createAccountLink = page.locator('#create-account-link');
        this.emailInput = page.locator('input[name="username"]', { state: 'attached' });
        this.passwordInput = page.locator('input[name="password"]', { state: 'attached' });
        this.loginButton = page.locator('#submit-btn', { state: 'attached' });
     }
    
     async navigateToLoginPage() {
         this.url = process.env.LOGIN_URL;
        // await for anh ongoing actions. 
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
     }

     async clicOnCreateAccount() {
        await this.createAccountLink.click();
     }

     async inputEmail(email) {
       await this.emailInput.fill(email);
     }

     async inputPassword(password) {
       await this.passwordInput.fill(password);
     }

     async clickLogin() {
      await this.loginButton.click();
     }

     async loginUser(email, password) {
      await this.inputEmail(email);
      await this.inputPassword(password);
      await this.clickLogin();
     }
}

