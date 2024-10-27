const { expect } = require('@playwright/test');

exports.SignupPage = class SignupPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.url = `https:/mailchimp.com/signup`;
        this.signupPageHeader = page.locator("#signup-page-default-title");
        this.emailInput = page.locator('#email');
        this.usernameInput = page.locator('#new_username');
        this.passwordInput = page.locator('#new_password');
        this.signUpButton = page.locator('#create-account-enabled');
        this.signupSetupIputFirstname = page.locator('[data-testid="first-name"]');
     }
    
     async navigateToSignupPage() {
        await this.page.goto(this.url);
     }

     async inputEmail(email) {
        await this.emailInput.fill(email);
     }

     async inputUsername(username) {
         await this.usernameInput.fill(username);
     }

     async inputPassword(password) {
         await this.passwordInput.fill(password);
     }

     async clickSignUp() {
         await this.signUpButton.click();
     }

     async signUp(email, username, password) {
         await this.inputEmail(email);
         await this.page.waitForTimeout(2000);
         // await this.inputUsername(username);
         await this.inputPassword(password);
         await this.clickSignUp();
     }
}

