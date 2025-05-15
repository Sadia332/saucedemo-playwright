class ProductsPage {
    constructor(page) {
        this.page = page;
        this.sortDropdown = '.product_sort_container';
        this.firstItemAddButton = ':nth-match(.btn_inventory, 1)'; 
        this.cartIcon = '.shopping_cart_link';
    }

    async sortProductsLowToHigh() {
        await this.page.selectOption(this.sortDropdown, 'lohi');
    }

    async addFirstItemToCart() {
        await this.page.click(this.firstItemAddButton);
    }

    async goToCart() {
        await this.page.click(this.cartIcon);
    }
}
module.exports = ProductsPage;