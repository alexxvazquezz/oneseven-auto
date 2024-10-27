const { Given, When, Then, And } = require('@cucumber/cucumber');
const { SignupPage } = require('../../pages/SignupPage');
const { HomePage } = require('../../pages/HomePage');
const { LoginPage } = require('../../pages/LoginPage');
const EmailPage = require('../../pages/EmailPage');
const { RegisterSuccessPage } = require('../../pages/RegisterSuccessPage');
const { expect } = require('@playwright/test');
const { context } = require('../support/hooks');
const { getHtmlFromEmailBody } = require('../../email/email');
require('dotenv').config();


Given('User is on the Mailchimp homepage', async function() {
    const homePage = new HomePage(this.page);
    let currentURL = '';

    await homePage.navigateToHomePage();

    currentURL = this.page.url();

    expect(currentURL).toBe('https://mailchimp.com/');
});


When('User clicks on the login button', async function() {
    const homePage = new HomePage(this.page);

    await homePage.clickLogin();
});

Then('User is redirected to the login page', async function() {
    const loginPage = new LoginPage(this.page);

    loginHeaderText = await loginPage.loginHeader.textContent();

    expect(loginHeaderText).toBe('Log in');
});

When('User clicks on "Create an account" link', async function() {
    const loginPage = new LoginPage(this.page);

    await loginPage.clicOnCreateAccount();
});

Then('User should be sent to the Signup Page', async function() {
    const signupPage = new SignupPage(this.page);

    signupPageHeaderText = await signupPage.signupPageHeader.textContent();

    expect(signupPageHeaderText).toBe('Sign up for Mailchimp');
})

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
    const emailPage = new EmailPage(this.page);
   
    const emailHtmlBody = await getHtmlFromEmailBody(process.env.INBOX_ID);
    await emailPage.renderContent(emailHtmlBody);
     
    const pagePromise = context.waitForEvent('page');
    await emailPage.clickActivateAccount();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    
})

Then('The system should authenticate user, and put them into the signup setup flow', async function() {
    const signupPage = new SignupPage(this.page);

    const signupSetupIputFirstnameText = await signupPage.signupSetupIputFirstname.textContent();

    console.log(signupSetupIputFirstnameText);
})



