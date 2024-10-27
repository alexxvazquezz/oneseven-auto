const { expect } = require('@playwright/test');

exports.SignupPage = class SignupPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.url = 'https://login.mailchimp.com/signup/';
        this.signupPageHeader = page.locator("#signup-page-default-title");
        this.emailInput = page.locator('#email', { state: 'attached' });
        this.usernameInput = page.locator('#new_username', { state: 'attached' });
        this.passwordInput = page.locator('#new_password', { state: 'attached' });
        this.signUpButton = page.locator('#create-account-enabled', { state: 'attached' });
        this.signupSetupIputFirstname = page.locator('[data-testid="first-name"]');
        this.signupSetupHeader = page.locator('h2:has-text("Tell us a bit about you")');
        this.dismisPopup = page.locator('#onetrust-accept-btn-handler');
     }
    
     async navigateToSignupPage() {
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
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
         //await this.inputUsername(username);
         await this.inputPassword(password);
         await this.page.waitForTimeout(2000);
         await this.clickSignUp();
     }

     async handlePopup() {
        try {
            const popup = await this.page.waitForSelector('#onetrust-accept-btn-handler', { timeout: 5000 });

            if (popup) {
                await popup.click();
            }
        } catch (error) {
            console.log('Popup not found within the timeout.');
        }
    }
}

