exports.DashboardPage = class DashboardPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.headerElement = page.locator('h1:has-text("Home")');
        this.loginVerification = page.locator('text="Login verification"');
     }
}