const { Given, When, Then, And } = require('@cucumber/cucumber');
const { SignupPage } = require('../../pages/SignupPage');
const { HomePage } = require('../../pages/HomePage');
const { LoginPage } = require('../../pages/LoginPage');
const EmailPage = require('../../pages/EmailPage');
const { RegisterSuccessPage } = require('../../pages/RegisterSuccessPage');
const { expect } = require('@playwright/test');
const { context } = require('../support/hooks');
const { getHtmlFromEmailBody, getActivationLink } = require('../../email/email');
require('dotenv').config();



Given('User is on the Mailchimp Signup Page', async function() {
    const signupPage = new SignupPage(this.page);
    let currentURL = '';

    await signupPage.navigateToSignupPage();
    await signupPage.handlePopup();

    currentURL = this.page.url();

    expect(currentURL).toBe(signupPage.url);
});


// When('User clicks on the login button', async function() {
//     const homePage = new HomePage(this.page);

//     await homePage.clickLogin();
// });

// Then('User is redirected to the login page', async function() {
//     const loginPage = new LoginPage(this.page);

//     loginHeaderText = await loginPage.loginHeader.textContent();

//     expect(loginHeaderText).toBe('Log in');
// });

// When('User clicks on "Create an account" link', async function() {
//     const loginPage = new LoginPage(this.page);

//     await loginPage.clicOnCreateAccount();
// });

Then('User Enters all mandatory inputs: [email, username, password], and submits form', async function() {
    const signupPage = new SignupPage(this.page);
    const email = process.env.EMAIL_ADDRESS;
    const username = process.env.USERNAME;
    
    await signupPage.signUp(email, username, '!Terrada5224');
})

Then('User should be redirected to the signup success page', async function() {
    const registerSuccessPage = new RegisterSuccessPage(this.page);

    const successPageHeaderText = await registerSuccessPage.registerSuccessPageHeader.textContent();
    
    expect(successPageHeaderText).toBe(
        'Check your email'
    );
})

When('User clicks on "Activate Account" from email body', async function() {
    const emailHtmlBody = await getHtmlFromEmailBody(process.env.INBOX_ID);

    const activateLink = await getActivationLink(emailHtmlBody);

    await this.page.goto(activateLink);
    
})

Then('The system should authenticate user, and put them into the signup setup flow', async function() {
    const signupPage = new SignupPage(this.page);

    const signupSetupIputHeaderText = await signupPage.signupSetupHeader.textContent();

    expect(signupSetupIputHeaderText).toBe('Tell us a bit about you');
})



