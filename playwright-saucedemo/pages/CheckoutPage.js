class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameField = '#first-name';
        this.lastNameField = '#last-name';
        this.postalCodeField = '#postal-code';
        this.continueButton = '#continue';
        this.finishButton = '#finish';
        this.successMessage = page.locator('.complete-header'); 
        this.backHomeButton = '#back-to-products';

    }

    async fillCheckoutInfo(firstName, lastName, postalCode) {
        await this.page.fill(this.firstNameField, firstName);
        await this.page.fill(this.lastNameField, lastName);
        await this.page.fill(this.postalCodeField, postalCode);
    }

    async completePurchase() {
        await this.page.click(this.continueButton);
        await this.page.click(this.finishButton);
    }

    async getSuccessMessage() {
        return this.page.textContent(this.successMessage);
    }

    async returnToHomePage() {
        await this.page.click(this.backHomeButton);
    }
}
module.exports = CheckoutPage;