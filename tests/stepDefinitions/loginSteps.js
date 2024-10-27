const { Given, When, Then, And } = require('@cucumber/cucumber');
const { LoginPage } = require('../../pages/LoginPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { expect } = require('@playwright/test');
require('dotenv').config();
const username = process.env.ACTIVE_USER_EMAIL;
const password = process.env.ACTIVE_USER_PASS;

Given('I am on the login page', async function() {
    const loginPage = new LoginPage(this.page);
    let currentURL = '';

    await loginPage.navigateToLoginPage();

    currentURL = this.page.url();

    expect(currentURL).toBe(loginPage.url);
});


When('I enter my username, password and click login', async function() {
    const loginPage = new LoginPage(this.page);

    await loginPage.loginUser(username, password);
});

Then('I am redirected to the user dashboard', async function() {
    const dashboard = new DashboardPage(this.page);

    const headerElementText = await dashboard.headerElement.textContent();

    expect(headerElementText).toBe('Home');
})

