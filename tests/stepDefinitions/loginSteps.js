const { Given, When, Then, And } = require('@cucumber/cucumber');
const { LoginPage } = require('../../pages/LoginPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { expect } = require('@playwright/test');
require('dotenv').config();
const password = process.env.ACTIVE_USER_PASS;

Given('I am on the login page', async function() {
    const loginPage = new LoginPage(this.page);
    let currentURL = '';

    await loginPage.navigateToLoginPage();

    currentURL = await this.page.url();

    expect(currentURL).toBe(loginPage.url);
});


When('I enter my email, password and click login', async function() {
    const loginPage = new LoginPage(this.page);
    const email = process.env.ACTIVE_USER_EMAIL;

    await loginPage.loginUser(email, password);
});

Then('I am redirected to the user dashboard', async function() {
    const dashboard = new DashboardPage(this.page);

    const headerElementText = await dashboard.loginVerification.textContent();

    expect(headerElementText).toBe('Login verification');
})

