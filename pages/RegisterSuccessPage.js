const { expect } = require('@playwright/test');

exports.RegisterSuccessPage = class RegisterSuccessPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page
        this.registerSuccessPageHeader = page.locator('#signup-success > div > div.content.line.section > section > div > h1');
     }     
}

