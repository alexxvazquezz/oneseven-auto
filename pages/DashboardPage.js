exports.DashboardPage = class DashboardPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.headerElement = page.locator("//h1[text()='Home']");
        this.loginVerification = page.locator('text="Login verification"', { state: 'attached' });
     }
}