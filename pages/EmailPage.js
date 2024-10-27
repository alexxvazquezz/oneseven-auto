const url = 'http://email'; // Mock URL used for routing

class EmailPage {
    constructor(page) {
        this.page = page;
        this.activateNowLink = this.page.locator('text="Activate Account"');
    }

    async renderContent(content) {
        await this.page.route(url, route => {
            route.fulfill({
                contentType: 'text/html',
                body: content
            });
        });

        await this.page.goto(url);
    }

    async clickActivateAccount() {
        await this.activateNowLink.click();
        await this.page.waitForLoadState();
    }
}

module.exports = EmailPage;